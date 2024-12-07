import 'webextension-polyfill';
import type { UnionRequest } from '@extension/shared/lib/utils';
import { MessageType } from '@extension/shared/lib/utils';
import { handleLinkSummary } from './listener/link-summary';
import { handleSummaryClosed } from './listener/summary-closed';

// Update message listener
chrome.runtime.onMessage.addListener((request: UnionRequest, sender) => {
  const tabId = sender.tab?.id;
  if (!tabId) return;

  switch (request.kind) {
    case MessageType.LINK_SUMMARY:
      handleLinkSummary(request, tabId);
      break;
    case MessageType.SUMMARY_CLOSED:
      handleSummaryClosed(request);
      break;
  }

  return true;
});
