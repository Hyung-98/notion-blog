import React from "react";

interface TableRendererProps {
  table: any;
}

const TableRenderer: React.FC<TableRendererProps> = ({ table }) => {
  if (!table || !table.has_children || !table.children) {
    return <div>No table data available</div>;
  }

  const rows = table.children;

  const headerRow = rows[0].table_row.cells.map((cell: any) =>
    cell.map((richText: any) => richText.text.content).join("")
  );

  const bodyRow = rows
    .slice(1)
    .map((row: any) =>
      row.table_row.cells.map((cell: any) => cell.map((richText: any) => richText.text.content).join(""))
    );

  return (
    <table className="w-full my-4">
      {headerRow && (
        <thead>
          <tr>
            {headerRow.map((header: any, idx: any) => (
              <th key={idx} className="border border-[#ccc] p-2 bg-gray-100 font-bold dark:bg-gray-800">
                {header}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {bodyRow.map((row: any, rowIndex: any) => (
          <tr key={rowIndex}>
            {row.map((cell: any, cellIndex: any) => (
              <td key={cellIndex} className="border border-[#ccc] p-2 text-center">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRenderer;
