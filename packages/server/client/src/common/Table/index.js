/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import NoRecordFound from '../NoRecordFound';
import Pagination from '../Pagination';
import Actions from './Actions';

const renderCols = (cols, obj) => {
  return (
    cols.map((col, idx) => <td key={idx}>{obj[col]}</td>)
  );
};

const renderRow = (keys, values) => {
  return (
    values.map((obj, idx) => (<tr key={idx}>{renderCols(keys, obj)}</tr>))
  );
};

const Table = (props) => {
  const { data, headers, pagination, actions } = props;
  const { pageCount, page } = pagination;

  // for pagination
  const [countPerPage] = useState(pageCount);
  const [tablePage, setPage] = useState(page);
  const [tableData, setData] = useState(data);

  const tablePageCount = Math.ceil(data.length / countPerPage);

  useEffect(() => {
    setData(data.slice(countPerPage * tablePage - countPerPage, countPerPage * tablePage));
  }, [tablePage, countPerPage, data]);

  // console.log('Table data', tableData, tablePageCount);
  return (
    <>
      <div className="pc-user-list">
        <table
          className="pc-table pc-user-list-table"
          cellPadding="0"
          cellSpacing="0"
        >
          <thead>
            <tr>
              {Object.values(headers).map((h, idx) => <th key={idx}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {tableData.length ? renderRow(Object.keys(headers), tableData) : (
              <tr>
                <td colSpan="5">
                  <NoRecordFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pc-actions">
        {actions ? <Actions actions={actions} /> : <div /> }
        <Pagination
          pageCount={tablePageCount}
          page={tablePage}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default Table;
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  headers: PropTypes.objectOf(PropTypes.any).isRequired,
  actions: PropTypes.arrayOf(PropTypes.any).isRequired,
  pagination: PropTypes.objectOf(PropTypes.any).isRequired,
};
