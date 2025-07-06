import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
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
}

interface TableData {
  columns: Column[];
  rows: Row[];
}

type SortOrder = 'asc' | 'desc';

const Table: React.FC<{ jsonData: TableData; initialVisibleRows?: number, href: string }> = ({
  jsonData,
  initialVisibleRows = 5,
  href
}) => {
  const { columns, rows } = jsonData;

  const [visibleRows, setVisibleRows] = useState(initialVisibleRows);
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

  const getSortIcon = (col: string) => {
        if (sortColumn === col) {
        return sortOrder === 'asc'
            ? <img src={sort_asc} alt="Sort Ascending" className="sort-icon" title="ascending"/>
            : <img src={sort_desc} alt="Sort Descending" className="sort-icon"  title="descending"/>;
        } else {
        return <img src={sort} alt="Sort" className="sort-icon" title='Sort'/>;
        }
    };

    var navigate = useNavigate();

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
          {sortedData.slice(0, visibleRows).map((row, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {(visibleRows < rows.length) && (
        <button className="view-more-button" 
                onClick={
                    () => {
                        if (visibleRows < 9)
                            setVisibleRows(prev => prev + initialVisibleRows)
                        else
                            navigate(href)
                    }
                        
                    }>
          View More
        </button>
      )
      }
    </div>
  );
};

export default Table;
