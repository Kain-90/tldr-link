import type { SummaryClosedRequest } from '@extension/shared';

// Import the abortControllers map
import { abortControllers } from './link-summary';

export const handleSummaryClosed = (request: SummaryClosedRequest) => {
  // Abort all ongoing summary generations
  for (const [url, controller] of abortControllers.entries()) {
    if (url === request.payload.url) {
      controller.abort();
      abortControllers.delete(url);
    }
  }
};
