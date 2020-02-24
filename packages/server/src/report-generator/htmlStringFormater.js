
const renderCols = (cols, obj) => {
  return (
    cols.map((col, idx) => `<td style="padding: 8px; text-align: center; border: 0.5px solid black">${obj[col]}</td>`)
  );
};

const renderRow = (keys, values) => {
  return (
    values.map((obj, idx) => `<tr>${renderCols(keys, obj)}</tr>`)
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
        <h1>
          ${boardDetail.name}
        </h1>
        <hr />
        <div>
          ${allImages.map(img => `<img src="file:///home/bhagya/workspace/reactjs/projects/probro/packages/server/src/public/user/10000001/report/${img}" style="height: 500px; width: 700px;" />`)}
        </div>
        <div>
        <table style="border-width: 1px; border-style: solid; margin: 10px;">
        <tbody style="display: block; height: auto;">
        <tr>
          ${Object.values(headers).map(header => `<th style="padding: 12px; background: green; font-size: 15px; min-width: 100px; color: white;">${header}</th>`)}
        </tr>
        ${renderRow(Object.keys(headers), tableData)}
      </tbody>
      </table>
        </div>
        </div>
    </body>
  </html>`
  );
};
