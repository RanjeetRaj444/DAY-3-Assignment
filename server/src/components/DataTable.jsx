import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ data, columns, initialPageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const pageCount = Math.ceil(data.length / pageSize);
  const displayedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort(col.key)}
              >
                {col.label} {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span>Page {currentPage} of {pageCount}</span>
        <button
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>

      <div className="mt-2">
        <label>Rows per page: </label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="ml-2 border rounded px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  initialPageSize: PropTypes.number,
};

DataTable.defaultProps = {
  initialPageSize: 10,
};

export default DataTable;
