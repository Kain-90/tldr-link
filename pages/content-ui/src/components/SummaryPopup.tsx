import React from 'react';

interface Props {
  position: {
    x: number;
    y: number;
  };
  summary: string;
  status: 'loading' | 'success' | 'error';
}

export const SummaryPopup: React.FC<Props> = ({ position, summary, status }) => {
  return (
    <div 
      className="fixed z-50 max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {status === 'loading' && (
        <div className="animate-pulse">Loading summary...</div>
      )}
      {status === 'success' && (
        <div className="prose dark:prose-invert">
          <p>{summary}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-red-500">Failed to load summary</div>
      )}
    </div>
  );
}; 