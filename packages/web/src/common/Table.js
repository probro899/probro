import React from 'react';

const renderCols = (cols, obj) => {
  return (
    cols.map((col, idx) => <td key={idx} style={{ textAlign: 'center', padding: 8 }}>{obj[col]}</td>)
  );
};

const renderRow = (keys, values) => {
  return (
    values.map((obj, idx) => (<tr key={idx} style={{ background: obj.rowColor ? obj.rowColor : (idx % 2 === 0 ? 'white' : '#f5f5f5') }}>{renderCols(keys, obj)}</tr>))
  );
};

export default (data) => {
  return (
    <table style={{ borderWidth: '1px', backgroundColor: '#aaaaaa', borderStyle: 'solid', margin: 10 }}>
      <tbody
        style={{
          display: 'block',
          overflowY: 'auto',
          height: 'auto',
          width: '100%',
        }}
      >
        <tr>
          {Object.values(data.headers).map((h, idx) => <th key={idx} style={{padding: 12, background: 'green', fontSize: 15, minWidth: 100, color: 'white' }}>{h}</th>)}
        </tr>
        {renderRow(Object.keys(data.headers), data.data)}
      </tbody>
    </table>
  );
};
