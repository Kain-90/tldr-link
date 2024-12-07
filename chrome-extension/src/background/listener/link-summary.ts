import { MessageType } from '@extension/shared';
import type { LinkSummaryRequest, LinkSummaryResponse } from '@extension/shared';
import { createDocument } from '@mixmark-io/domino';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

// Fetch page content
async function fetchPageContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw new Error(`Failed to fetch page content: ${error}`);
  }
}

// Parse page content and extract key information
async function parseContent(html: string): Promise<string> {
  const document = createDocument(html);
  const markdown = turndownService.turndown(document);
  return markdown;
}

class AbortError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AbortError';
  }
}

// Add an AbortController map to track requests
export const abortControllers = new Map<string, AbortController>();

// Update mockSummaryAPI to use AbortController
async function mockSummaryAPI(
  content: string,
  tabId: number,
  request: LinkSummaryRequest,
  abortController: AbortController,
): Promise<string> {
  const mockWords = content.split(' ');
  let summary = '';

  // Simulate streaming response
  for (const word of mockWords) {
    // 先检查是否已经中止
    if (abortController.signal.aborted) {
      throw new AbortError('Summary generation aborted');
    }

    console.log('Sending partial summary...');
    await new Promise(resolve => setTimeout(resolve, 100)); // Delay between words
    summary += word + ' ';

    // 再次检查是否已经中止，如果中止则不发送消息
    if (!abortController.signal.aborted) {
      // Send partial summary
      chrome.tabs.sendMessage<LinkSummaryResponse>(tabId, {
        kind: MessageType.LINK_SUMMARY,
        payload: {
          url: request.payload.url,
          status: 'streaming',
          position: request.payload.position,
          summary: summary.trim(),
        },
      });
    }
  }

  return summary.trim();
}

// Update handleLinkSummaryPipeline to use AbortController
async function handleLinkSummaryPipeline(
  url: string,
  tabId: number,
  request: LinkSummaryRequest,
  abortController: AbortController,
): Promise<string> {
  try {
    const pageContent = await fetchPageContent(url);
    const parsedContent = await parseContent(pageContent);
    const summary = await mockSummaryAPI(parsedContent, tabId, request, abortController);
    return summary;
  } catch (error) {
    if (!(error instanceof AbortError)) {
      console.error('Pipeline error:', error);
    }
    throw error;
  }
}

export const handleLinkSummary = (request: LinkSummaryRequest, tabId: number) => {
  // Create new AbortController for this request
  const abortController = new AbortController();
  abortControllers.set(request.payload.url, abortController);

  // Send loading status
  chrome.tabs.sendMessage<LinkSummaryResponse>(tabId, {
    kind: MessageType.LINK_SUMMARY,
    payload: {
      url: request.payload.url,
      status: 'loading',
      position: request.payload.position,
      summary: '',
    },
  });

  // Update pipeline call to include AbortController
  handleLinkSummaryPipeline(request.payload.url, tabId, request, abortController)
    .then(summary => {
      // 检查是否已经中止
      if (!abortController.signal.aborted) {
        // Send final success result
        chrome.tabs.sendMessage<LinkSummaryResponse>(tabId, {
          kind: MessageType.LINK_SUMMARY,
          payload: {
            url: request.payload.url,
            status: 'success',
            position: request.payload.position,
            summary,
          },
        });
      }
      abortControllers.delete(request.payload.url); // Clean up
    })
    .catch(error => {
      abortControllers.delete(request.payload.url); // Clean up
      if (error instanceof AbortError) {
        // do nothing
      } else if (!abortController.signal.aborted) {
        console.error('Pipeline error:', error);
        // Send error status only if not aborted
        chrome.tabs.sendMessage<LinkSummaryResponse>(tabId, {
          kind: MessageType.LINK_SUMMARY,
          payload: {
            url: request.payload.url,
            status: 'error',
            position: request.payload.position,
            summary: '',
          },
        });
      }
    });
};
