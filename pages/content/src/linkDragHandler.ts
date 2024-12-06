import type { LinkSummaryRequest } from '@extension/shared/lib/utils';

export function initLinkDragHandler() {
  document.addEventListener('dragstart', e => {
    const link = e.target as HTMLAnchorElement;
    if (link.tagName === 'A') {
      const url = link.href;
      const position = {
        x: e.clientX,
        y: e.clientY,
      };

      chrome.runtime.sendMessage<LinkSummaryRequest>({
        url,
        position,
      });
    }
  });
}
