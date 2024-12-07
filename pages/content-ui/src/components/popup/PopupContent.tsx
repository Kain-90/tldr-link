import Markdown from 'react-markdown';
import { useEffect, useRef } from 'react';

interface Props {
  status: 'loading' | 'streaming' | 'success' | 'error';
  summary: string;
}

export const PopupContent = ({ status, summary }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [summary]);

  return (
    <div ref={contentRef} className="max-h-[50vh] min-h-[100px] overflow-y-auto p-4">
      {status === 'loading' && (
        <div className="flex h-full items-center justify-center space-x-2">
          <div className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
          <span className="text-gray-600 dark:text-gray-300">Generating summary...</span>
        </div>
      )}
      {(status === 'streaming' || status === 'success') && (
        <div>
          <div key="markdown-content" className="prose prose-sm max-w-none dark:prose-invert">
            <Markdown>{status === 'streaming' ? `${summary}...` : summary}</Markdown>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="flex h-full items-center justify-center">
          <div className="text-red-500">Failed to load summary</div>
        </div>
      )}
    </div>
  );
};
