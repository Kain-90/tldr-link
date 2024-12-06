import React from 'react';
import { Copy, Check, Pin, X } from 'lucide-react';
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
      onMouseDown={onDragStart}
      role="button"
      tabIndex={0}>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Link Summary</h3>
        <div
          className="flex items-center gap-1 rounded-lg p-1.5 pr-2 text-sm text-gray-500 hover:cursor-default hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
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
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
        <button
          onClick={onPinClick}
          className={`flex items-center rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isPinned
              ? 'text-indigo-600'
              : 'text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-300'
          }`}
          title={isPinned ? 'Unpin window' : 'Pin window'}>
          <Pin className={`size-4 ${isPinned ? 'rotate-45' : ''}`} />
        </button>
        <button
          onClick={onClose}
          className="flex items-center rounded-lg p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/50 dark:hover:text-red-300"
          title="Close">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
};
