const ToggleBlock = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  return (
    <details className="p-3 rounded border border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:border-zinc-600">
      <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-100">{title}</summary>
      <div className="mt-2 pl-4 text-sm text-gray-700 dark:text-gray-300">{children}</div>
    </details>
  );
};

export default ToggleBlock;
