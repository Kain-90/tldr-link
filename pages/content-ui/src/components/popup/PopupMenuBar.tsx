import { useCallback, useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  summary: string;
}

export const PopupMenuBar = ({ summary }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // 2秒后恢复原始状态
  }, [summary]);

  const handleShare = useCallback(() => {
    // TODO: 实现分享功能
    console.log('Share clicked');
  }, []);

  const handleTranslate = useCallback(() => {
    // TODO: 实现翻译功能
    console.log('Translate clicked');
  }, []);

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-2 dark:border-gray-700">
      <button
        onClick={handleCopy}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 rounded-lg ${
          copied
            ? 'bg-green-600 hover:bg-green-500 active:bg-green-700'
            : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'
        }`}
        title="Copy to clipboard">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {/* ... 其他按钮保持不变 ... */}
    </div>
  );
};