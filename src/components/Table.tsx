import React, { useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Table.css';
import sort_desc from '../assets/images/sort_desc.png'
import sort_asc from '../assets/images/sort_asc.png'
import sort from '../assets/images/sort.png'

interface Column {
  key: string;
  label: string;
  sortable: boolean;
}

interface Row {
  [key: string]: string | number;
  id: string;
}

interface TableData {
  type: string;
  columns: Column[];
  rows: Row[];
}

type SortOrder = 'asc' | 'desc';

const Table: React.FC<{ jsonData: TableData; initialVisibleRows?: number, href: string, isOnPage?: boolean}> = ({
  jsonData,
  initialVisibleRows = 5,
  isOnPage = false,
}) => {

  const {type, columns, rows } = jsonData;

  const navigate = useNavigate();
  const location = useLocation();


  const pageSize = isOnPage ? 7 : initialVisibleRows;
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSortClick = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };
  
  const handleItemClick = (type: string, id: string) => {
    if (location.pathname.includes(type)) {
      navigate(`${id}`, { state: { type, id } })  
    } else {
      navigate(`${type}/${id}`, { state: { type, id } })
    }
  }

  const sortedData = [...rows].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn];
    const valB = b[sortColumn];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }

    return sortOrder === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const totalPages = Math.ceil(rows.length / pageSize);

  const displayedRows = sortedData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const emptyRows = pageSize - displayedRows.length;

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const getSortIcon = (col: string) => {
    if (sortColumn === col) {
    return sortOrder === 'asc'
        ? <img src={sort_asc} alt="Sort Ascending" className="sort-icon" title="ascending"/>
        : <img src={sort_desc} alt="Sort Descending" className="sort-icon"  title="descending"/>;
    } else {
    return <img src={sort} alt="Sort" className="sort-icon" title='Sort'/>;
    }
  };
  

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>
                <div className="header-content">
                  {col.label}
                  {col.sortable && (
                    <button
                      className="sort-button"
                      onClick={() => handleSortClick(col.key)}
                      aria-label={`Sort ${col.label}`}
                    >
                      {getSortIcon(col.key)}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row, index) => (
            <tr key={index}
              onClick={() => {handleItemClick(type, row['id'])}}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
          {Array.from({ length: emptyRows }).map((_, index) => (
              <tr
                  key={`empty-${index}`}
                  className="empty-row"
              >
                  {columns.map(col => (
                      <td key={col.key}>&nbsp;</td>
                  ))}
              </tr>
          ))}
        </tbody>
      </table>
      {rows.length > pageSize && (
        <div className="table-pagination">
          <button
            className="view-more-button"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            ◀ Previous
          </button>

          <span className="page-indicator">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            className="view-more-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
