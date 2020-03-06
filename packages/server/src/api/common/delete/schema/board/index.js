/* eslint-disable import/no-cycle */
import update from '../../../update/update';
import db from '../../../../../db';
import deleteBoardHelper from '../helper-functions/board/deleteBoard';
import deleteBoardColumnHelper from '../helper-functions/board/deleteColumn';
import deleteBoardColumnCardHelper from '../helper-functions/board/deleteBoardColumnCard';

function addBoardActivity(record) {
  db.execute(async ({ insert }) => {
    insert('BoardActivity', record);
  });
}

async function deleteBoard(record) {
  // console.log('delete board handler', record);
  // const dbDelete = Delete.bind(this);
  const res = await update.call(this, 'Board', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  // deleteBoardHelper(dbDelete, record);
  return res;
}

async function deleteBoardColumn(record) {
  const { session } = this;
  // console.log('record in deleteBoardColumn', record);
  // const dbColDelete = Delete.bind(this);
  // deleteBoardColumnHelper(dbColDelete, record);
  const res = await update.call(this, 'BoardColumn', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  addBoardActivity({ userId: session.values.user.id, timeStamp: Date.now(), boardId: record.boardId, columnId: record.id, message: 'Delete Column' });
  return res;
}

async function deleteBoardColumnCard(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // deleteBoardColumnCardHelper(Delete.bind(this), [record]);
  const res = await update.call(this, 'BoardColumnCard', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  addBoardActivity({ userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'Delete Card' });
  return res;
}

async function deleteBoardColumnCardAttachment(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardAttachment', record);
  const res = await update.call(this, 'BoardColumnCardAttachment', { deleteStatus: true, broadCastId: 1 }, { id: record.id });
  addBoardActivity({ attachmentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'Delete Attachment' });
  return res;
}

async function deleteBoardColumnCardComment(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardComment', record);
  const res = await update.call(this, 'BoardColumnCardComment', { deleteStatus: true, broadCastId: 1 }, { id: record.id });
  addBoardActivity({ commentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'Delete Comment' });
  return res;
}

async function deleteBordColumnDescription(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardDescription', record);
  const res = await update.call(this, 'BoardColumnCardDescription', {deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  addBoardActivity({ descriptionId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'Delete Descripion' });
  return res;
}

 async function deleteBoardColumnCardTag(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardTag', record);
  const res = await update.call(this, 'BoardColumnCardTag', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  addBoardActivity({ tagId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'Delete Tag' });
  return res;
}

export default [
  deleteBoard,
  deleteBoardColumn,
  deleteBoardColumnCard,
  deleteBoardColumnCardAttachment,
  deleteBoardColumnCardComment,
  deleteBordColumnDescription,
  deleteBoardColumnCardTag,
];
