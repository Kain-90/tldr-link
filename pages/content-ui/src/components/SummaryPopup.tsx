import React, { useEffect, useState } from 'react';
import { LinkSummaryResponse } from '@extension/shared/lib/utils';

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
      className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md"
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