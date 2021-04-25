/* eslint-disable import/no-cycle */
import update from '../../../update/update';
import db from '../../../../../db';
import addBoardActivity from '../../../addBoardActivity';
import deleteBoardMember from './deleteBoardMember';
import databaseCache from '../../../../../cache/database/cache';

async function deleteBoard(record) {
  try {
    const { session } = this;
    // console.log('delete board called', record);
    const isYourBoard = session.values.user.id === databaseCache.get('Board').find(b => b.id === parseInt(record.id, 10)).userId;
    if (isYourBoard) {
      const res = await update.call(this, 'Board', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
      return res;
    }
    const boardMemberid = databaseCache.get('BoardMember').find(bm => bm.boardId === record.id && bm.tuserId === session.values.user.id);
    deleteBoardMember.call(this, { id: boardMemberid.id, boardId: record.id, userId: session.values.user.id }, 'leave');
    return 'Class leave successfull';
  } catch (e) {
    console.error('Error in deleteBoard', e);
  }
}

async function deleteBoardColumn(record) {
  try {
    const { session } = this;
    const res = await update.call(this, 'BoardColumn', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
    addBoardActivity(this, db, { userId: session.values.user.id, timeStamp: Date.now(), boardId: record.boardId, columnId: record.id, message: 'deleteColumn' });
    return res;
  } catch (e){
    console.error('Error deleteBoardColumn', e)
  }
}

async function deleteBoardColumnCard(record) {
  try {
    const { session } = this;
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    // deleteBoardColumnCardHelper(Delete.bind(this), [record]);
    const res = await update.call(this, 'BoardColumnCard', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
    addBoardActivity(this, db, { userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'deleteCard' });
    return res;
  } catch (e) {
    console.error('Error in deleteBoardColumnCard', e)
  }
}

async function deleteBoardColumnCardAttachment(record) {
  try {
    const { session } = this;
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    // Delete.call(this, 'BoardColumnCardAttachment', record);
    const res = await update.call(this, 'BoardColumnCardAttachment', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
    addBoardActivity(this, db, { attachmentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'deleteAttachment' });
    return res;
  } catch (e) {
    console.error('Error in deleteBoardColumnCardAttachment', e)
  }
}

async function deleteBoardColumnCardComment(record) {
  try {
    const { session } = this;
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    // Delete.call(this, 'BoardColumnCardComment', record);
    const res = await update.call(this, 'BoardColumnCardComment', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
    addBoardActivity(this, db, { commentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'deleteComment' });
    return res;
  } catch (e) {
    console.error('Error in deleteBoardColumnCardComment', e)
  }
}

async function deleteBordColumnDescription(record) {
  try {
    const { session } = this;
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    // Delete.call(this, 'BoardColumnCardDescription', record);
    const res = await update.call(this, 'BoardColumnCardDescription', {deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
    addBoardActivity(this, db, { descriptionId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'deleteDescripion' });
    return res;
  } catch (e) {
    console.error('Error in deleteBordColumnDescription', e)
  }
}

 async function deleteBoardColumnCardTag(record) {
  try {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardTag', record);
  const res = await update.call(this, 'BoardColumnCardTag', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  addBoardActivity(this, db, { tagId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'deleteTag' });
  return res;
  } catch (e) {
    console.error('Error in deleteBoardColumnCardTag', e)
  }
}

export default [
  deleteBoard,
  deleteBoardColumn,
  deleteBoardColumnCard,
  deleteBoardColumnCardAttachment,
  deleteBoardColumnCardComment,
  deleteBordColumnDescription,
  deleteBoardColumnCardTag,
  deleteBoardMember,
];
