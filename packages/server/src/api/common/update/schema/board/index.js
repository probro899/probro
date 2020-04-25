/* eslint-disable import/no-cycle */
import update from '../../update';
import db from '../../../../../db';
import addBoardActivity from '../../../addBoardActivity';

function updateBoard(records) {
  const { session } = this;
  // console.log('updateBoard func', records, session.values);
  const boardId = records[1].id;
  const record = records[0];
  delete record.todo;
  update.call(this, 'Board', record, records[1]);
  addBoardActivity(this, db, { userId: session.values.user.id, boardId, message: 'updateBoard', timeStamp: Date.now() });
}

function updateBoardColumn(records) {
  // console.log('update Board Coulumn called', records);
  const { session } = this;
  const record = records[0];
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  update.call(this, 'BoardColumn', record, records[1]);
  addBoardActivity(this, db, { userId: session.values.user.id, boardId, message: 'updateColumn', timeStamp: Date.now() });
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
  addBoardActivity(this, db, { boardId, userId: session.values.user.id, tColId, fColId, message: todo, cardId, timeStamp: Date.now() });
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
  addBoardActivity(this, db, { userId: session.values.user.id, boardId, message: 'updateAttachment', attachmentId: records[1].id, cardId, timeStamp: Date.now() });
}

function updateBoardColumnCardComment(records) {
  update.call(this, 'BoardColumnCardComment', ...records);
}

function updateBoardColumnCardDescription(records) {
  const { session } = this;
  const broadCastArr = records[0].broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const record = records[0];
  const { boardColumnCardId } = record;
  update.call(this, 'BoardColumnCardDescription', record, records[1]);
  addBoardActivity(this, db, { userId: session.values.user.id, boardId, message: 'updateDescription', descriptionId: records[1].id, cardId: boardColumnCardId, timeStamp: Date.now() });
}

export default [
  updateBoard,
  updateBoardColumn,
  updateBoardColumnCard,
  updateBoardColumnCardAttachment,
  updateBoardColumnCardComment,
  updateBoardColumnCardDescription,
];
