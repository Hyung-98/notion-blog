const Table = ({ rows }: { rows: string[][] }) => {
  if (!rows?.length) return null;

  const [header, ...body] = rows;

  return (
    <div className="overflow-x-auto my-6 border rounded">
      <table className="min-w-full border-collapse text-left">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            {header.map((cell, idx) => (
              <th key={idx} className="px-4 py-2 border-b text-sm font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 border-b text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
