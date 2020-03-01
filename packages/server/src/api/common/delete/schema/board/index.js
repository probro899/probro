/* eslint-disable import/no-cycle */
import Delete from '../../delete';
import db from '../../../../../db';
import deleteBoardHelper from '../helper-functions/board/deleteBoard';
import deleteBoardColumnHelper from '../helper-functions/board/deleteColumn';
import deleteBoardColumnCardHelper from '../helper-functions/board/deleteBoardColumnCard';

function addBoardActivity(record) {
  db.execute(async ({ insert }) => {
    insert('BoardActivity', record);
  });
}

function deleteBoard(record) {
  // console.log('delete board handler', record);
  const dbDelete = Delete.bind(this);
  deleteBoardHelper(dbDelete, record);
}

function deleteBoardColumn(record) {
  const { session } = this;
  // console.log('record in deleteBoardColumn', record);
  const dbColDelete = Delete.bind(this);
  deleteBoardColumnHelper(dbColDelete, record);
  addBoardActivity({ userId: session.values.user.id, timeStamp: Date.now(), boardId: record.boardId, columnId: record.id, message: 'Delete Column' });
}

function deleteBoardColumnCard(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  deleteBoardColumnCardHelper(Delete.bind(this), [record]);
  addBoardActivity({ userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'Delete Card' });
}

function deleteBoardColumnCardAttachment(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  Delete.call(this, 'BoardColumnCardAttachment', record);
  addBoardActivity({ attachmentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'Delete Attachment' });
}

function deleteBoardColumnCardComment(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  Delete.call(this, 'BoardColumnCardComment', record);
  addBoardActivity({ commentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'Delete Comment' });
}

function deleteBordColumnDescription(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  Delete.call(this, 'BoardColumnCardDescription', record);
  addBoardActivity({ descriptionId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'Delete Descripion' });
}

function deleteBoardColumnCardTag(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  Delete.call(this, 'BoardColumnCardTag', record);
  addBoardActivity({ tagId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'Delete Tag' });
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
