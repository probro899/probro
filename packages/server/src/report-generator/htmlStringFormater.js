const renderCols = (cols, obj) => {
  return (
    cols.map((col, idx) => `<td style="padding: 8px; text-align: center;">${obj[col] || ''}</td>`)
  );
};

const renderRow = (keys, values) => {
  return (
    values.map((obj, idx) => {
      let background;
      if (idx % 2 === 0) {
        background = '#fff';
      } else {
        background = '#f5f5f5';
      }
      return `<tr style="background-color: ${background}">${renderCols(keys, obj).join('')}</tr>`;
    })
  );
};

export default (reportData) => {
  const { allImages, boardDetail, tableData } = reportData;
  const headers = { userName: 'Name',
    noOfCreateCard: 'No Of Create Cards',
    noOfMoveCard: 'No Of Move Cards',
    noOfComment: 'No Of Comments',
    noOfHours: 'Calling Hours',
    noOfMessage: 'No Of Messages',
  };
  return (
    `<html>
    <body>
      <div style="width: 100%; text-align: center;">
        <h1 style="color: #1d4354;">
          ${boardDetail.name}
        </h1>
        <hr />
        <div>
          ${allImages.map(img => `<img src="file:///Users/Nabin/workspace/probro/packages/server/src/public/user/10000001/report/${img}" style="height: 400px; width: 400px;" />`)}
        </div>
        <div style="width: 100%;">
          <div style="padding: 10px;"><h4 style="color: #1d4354;">Tabulated Data</h4><div/>
          <table style="border: 1px solid #e0e0e0; width: 100%;">
            <tbody>
              <tr>
                ${Object.values(headers).map(header => `<th style="background-color: #1d4354; color: #fff; padding: 5px; font-size: 14px;">${header}</th>`).join('')}
              </tr>
              ${renderRow(Object.keys(headers), tableData).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </body>
  </html>`
  );
};
