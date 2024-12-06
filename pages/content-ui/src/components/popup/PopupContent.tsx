interface Props {
  status: 'loading' | 'success' | 'error';
  summary: string;
}

export const PopupContent = ({ status, summary }: Props) => (
  <div className="p-4">
    {status === 'loading' && (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        <span className="text-gray-600 dark:text-gray-300">Generating summary...</span>
      </div>
    )}
    {status === 'success' && (
      <div className="prose dark:prose-invert">
        <p>{summary}</p>
      </div>
    )}
    {status === 'error' && <div className="text-red-500">Failed to load summary</div>}
  </div>
);
