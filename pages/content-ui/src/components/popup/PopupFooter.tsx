import { Settings } from 'lucide-react';

export const PopupFooter = () => (
  <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
    <div className="flex items-center gap-2">
      <span>Powered by TLDR Link</span>
      <span>•</span>
      <button className="hover:text-gray-700 dark:hover:text-gray-300">Feedback</button>
    </div>
    <button
      className="flex items-center gap-1 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-300"
      title="Settings">
      <Settings className="h-4 w-4" />
    </button>
  </div>
);
