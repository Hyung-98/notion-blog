import React from 'react';
import styles from '@/app/_styles/TableRenderer.module.css';

interface TableRendererProps {
  table: any;
}

const TableRenderer: React.FC<TableRendererProps> = ({ table }) => {
  if (!table || !table.has_children || !table.children) {
    return <div>No table data available</div>;
  }

  const rows = table.children;

  const headerRow = rows[0].table_row.cells.map((cell: any) =>
    cell.map((richText: any) => richText.text.content).join(''),
  );

  const bodyRow = rows
    .slice(1)
    .map((row: any) =>
      row.table_row.cells.map((cell: any) => cell.map((richText: any) => richText.text.content).join('')),
    );

  return (
    <table className={styles.table}>
      {headerRow && (
        <thead>
          <tr>
            {headerRow.map((header: any, idx: any) => (
              <th
                key={idx}
                className={styles.th}
              >
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
              <td
                key={cellIndex}
                className={styles.td}
              >
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
