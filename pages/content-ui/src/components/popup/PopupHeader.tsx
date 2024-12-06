import React from 'react';
import { Copy, Check, Pin } from 'lucide-react';
import Zap from '@extension/ui/lib/svg/zap.svg';

interface Props {
  onClose: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  isPinned: boolean;
  onPinClick: () => void;
  summary: string;
  usageCount?: number;
}

export const PopupHeader = ({ onClose, onDragStart, isPinned, onPinClick, summary, usageCount = 0 }: Props) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [summary]);

  return (
    <div
      className="flex cursor-move select-none items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700"
      onMouseDown={onDragStart}>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Link Summary</h3>
        <div
          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 rounded-lg p-1.5 pr-2 hover:cursor-default hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Power">
          <img src={Zap} alt="Zap" width={20} height={20} />
          <span>{usageCount}</span>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleCopy}
          className={`flex items-center rounded-lg p-1.5 ${
            copied
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-300'
          } hover:bg-gray-100 dark:hover:bg-gray-700`}
          title="Copy to clipboard">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
        <button
          onClick={onPinClick}
          className={`flex items-center rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isPinned
              ? 'text-indigo-600'
              : 'text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-300'
          }`}
          title={isPinned ? 'Unpin window' : 'Pin window'}>
          <Pin className={`h-4 w-4 ${isPinned ? 'rotate-45' : ''}`} />
        </button>
        <button
          onClick={onClose}
          className="flex items-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          title="Close">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
