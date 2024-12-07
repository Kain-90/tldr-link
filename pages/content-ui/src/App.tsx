import { useEffect, useState } from 'react';
import { Button } from '@extension/ui';
import type { LinkSummaryResponse, SummaryClosedRequest } from '@extension/shared';
import { useStorage, MessageType } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { SummaryPopup } from '@src/components/SummaryPopup';

export default function App() {
  const theme = useStorage(exampleThemeStorage);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [summaryPopupData, setSummaryPopupData] = useState<LinkSummaryResponse | null>(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: LinkSummaryResponse) => {
      if (message.kind === MessageType.LINK_SUMMARY) {
        setShowSummaryPopup(true);
        setSummaryPopupData(message);
      }
    });

    // const handleEscKey = (event: KeyboardEvent) => {
    //   if (event.key === 'Escape') {
    //     // fixme: no summary popup data
    //     handleCloseSummary();
    //   }
    // };

    // document.addEventListener('keydown', handleEscKey);

    // return () => {
    //   document.removeEventListener('keydown', handleEscKey);
    // };
  }, []);

  const handleCloseSummary = () => {
    chrome.runtime.sendMessage<SummaryClosedRequest>({
      kind: MessageType.SUMMARY_CLOSED,
      payload: { url: summaryPopupData?.payload.url ?? '' },
    });

    setShowSummaryPopup(false);
    setSummaryPopupData(null);
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
      <div className="flex gap-1 text-blue-500">
        Edit <strong className="text-blue-700">pages/content-ui/src/app.tsx</strong> and save to reload.
      </div>
      <Button theme={theme} onClick={exampleThemeStorage.toggle}>
        Toggle Theme
      </Button>
      {showSummaryPopup && summaryPopupData?.payload && (
        <SummaryPopup
          position={summaryPopupData.payload.position}
          summary={summaryPopupData.payload.summary}
          status={summaryPopupData.payload.status}
          onClose={handleCloseSummary}
        />
      )}
    </div>
  );
}
