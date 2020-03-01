import update from '../../update';
import db from '../../../../../db';

function addBoardActivity(record) {
  db.execute(async ({ insert }) => {
    insert('BoardActivity', record);
  });
}

function updateBoard(records) {
  const { session } = this;
  // console.log('updateBoard func', records, session.values);
  const boardId = records[1].id;
  const record = records[0];
  const { todo } = record;
  delete record.todo;
  update.call(this, 'Board', record, records[1]);
  addBoardActivity({ userId: session.values.user.id, boardId, message: todo, timeStamp: Date.now() });
}

function updateBoardColumn(records) {
  const { session } = this;
  const record = records[0];
  const { todo } = record;
  delete record.todo;
  update.call(this, 'BoardColumn', record, records[1]);
  const broadCastArr = records[0].broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  addBoardActivity({ userId: session.values.user.id, boardId, message: todo, timeStamp: Date.now() });
}

function updateBoardColumnCard(records) {
  // console.log('update boardCoolumn card', records);
  const { session } = this;
  const broadCastArr = records[0].broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const record = records[0];
  const cardId = records[1].id;
  const { tColId, fColId, todo } = record;
  delete record.todo;
  delete record.tColId;
  delete record.fColId;
  update.call(this, 'BoardColumnCard', record, records[1]);
  addBoardActivity({ boardId, userId: session.values.user.id, tColId, fColId, message: todo, cardId, timeStamp: Date.now() });
}

function updateBoardColumnCardAttachment(records) {
  const { session } = this;
  const broadCastArr = records[0].broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const record = records[0];
  const { cardId, todo } = record;
  delete record.cardId;
  delete record.todo;
  update.call(this, 'BoardColumnCardAttachment', record, records[1]);
  addBoardActivity({ userId: session.values.user.id, boardId, message: todo, attachmentId: records[1].id, cardId, timeStamp: Date.now() });
}

function updateBoardColumnCardComment(records) {
  update.call(this, 'BoardColumnCardComment', ...records);
}

function updateBoardColumnCardDescription(records) {
  const { session } = this;
  const broadCastArr = records[0].broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const record = records[0];
  const { cardId, todo } = record;
  delete record.cardId;
  delete record.todo;
  update.call(this, 'BoardColumnCardDescription', record, records[1]);
  addBoardActivity({ userId: session.values.user.id, boardId, message: todo, attachmentId: records[1].id, cardId, timeStamp: Date.now() });
}

export default [
  updateBoard,
  updateBoardColumn,
  updateBoardColumnCard,
  updateBoardColumnCardAttachment,
  updateBoardColumnCardComment,
  updateBoardColumnCardDescription,
];
