import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';
import { LinkSummaryResponse, LinkSummaryRequest, MessageType } from '@extension/shared/lib/utils';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

// Mock API response
const mockSummaryAPI = async (url: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `This is a mock summary for ${url}. In production, this would be replaced with actual AI-generated content from your backend service.`;
};

chrome.runtime.onMessage.addListener((request: LinkSummaryRequest, sender, sendResponse) => {
  const tabId = sender.tab?.id;
  if (!tabId) {
    return;
  }

  // notify content script to start loading
  chrome.tabs.sendMessage<LinkSummaryResponse>(tabId, {
    type: MessageType.LINK_SUMMARY,
    payload: {
      url: request.url,
      status: 'loading',
      position: request.position,
      summary: '',
    },
  });

  // call API to get summary
  mockSummaryAPI(request.url)
    .then(summary => {
      // send success result
      chrome.tabs.sendMessage<LinkSummaryResponse>(tabId, {
        type: MessageType.LINK_SUMMARY,
        payload: {
          url: request.url,
          status: 'success',
          position: request.position,
          summary,
        },
      });
    })
    .catch(error => {
      // send error status
      chrome.tabs.sendMessage<LinkSummaryResponse>(tabId, {
        type: MessageType.LINK_SUMMARY,
        payload: {
          url: request.url,
          status: 'error',
          position: request.position,
          summary: '',
        },
      });
    });

  return true; // indicate that the response will be sent asynchronously
});
