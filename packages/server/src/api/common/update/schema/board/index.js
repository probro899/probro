import update from '../../update';
import db from '../../../../../db';

function addBoardActivity(record) {
  db.execute(async ({ insert }) => {
    insert('BoardActivity', record);
  });
}

function updateBoard(records) {
  update.call(this, 'Board', ...records);
}

function updateBoardColumn(records) {
  update.call(this, 'BoardColumn', ...records);
}

function updateBoardColumnCard(records) {
  console.log('update boardCoolumn card', records);
  // const record = records[0];
  // records.shift();
  const record = records;
  delete record.todo;
  update.call(this, 'BoardColumnCard', ...record);
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
