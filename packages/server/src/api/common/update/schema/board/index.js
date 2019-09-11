import update from '../../update';

function updateBoard(records) {
  update.call(this, 'Board', ...records);
}

function updateBoardColumn(records) {
  update.call(this, 'BoardColumn', ...records);
}

function updateBoardColumnCard(records) {
  // const record = records[0];
  // records.shift();
  update.call(this, 'BoardColumnCard', ...records);
}

function updateBoardColumnCardAttachment(records) {
  update.call(this, 'BoardColumnCardAttachment', ...records);
}

function updateBoardColumnCardComment(records) {
  update.call(this, 'BoardColumnCardComment', ...records);
}

function updateBoardColumnCardDescription(records) {
  update.call(this, 'BoardColumnCardDescription', ...records);
}

export default [
  updateBoard,
  updateBoardColumn,
  updateBoardColumnCard,
  updateBoardColumnCardAttachment,
  updateBoardColumnCardComment,
  updateBoardColumnCardDescription,
];
