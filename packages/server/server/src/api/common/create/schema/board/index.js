/* eslint-disable import/no-cycle */
import add from '../../add';
import db from '../../../../../db';
import buildPdfHelper from '../../../../../report-generator';
import addBoardMember from './addBoardMember';
import copyBoardColumnCard from './copyBoardColumnCard';
import addBoardActivity from '../../../addBoardActivity';

async function addBoard(record) {
  try {
    const { session } = this;
    // console.log('user type', session.values.user.type);
    const boardId = await add.call(this, 'Board', { type: session.values.user.type === 'admin' ? 'template' : 'private', ...record });
    const boardMemberId = await add.call(this, 'BoardMember', { boardId, tuserId: record.userId, fuserId: record.userId, joinStatus: true, timeStamp: Date.now(), userType: 'creator' });
    session.subscribe(`Board-${boardId}`);
    addBoardActivity(this, db, { boardId, timeStamp: Date.now(), userId: record.userId, message: 'createBoard' });
    // console.log('boardid in addBorad', boardId);
    return { boardId, boardMemberId };
  } catch (e) {
    console.error('Error in addBoard', e);
  }
}

async function addBoardColumn(record) {
  try {
    const res = await add.call(this, 'BoardColumn', record);
    addBoardActivity(this, db, { userId: record.userId, timeStamp: Date.now(), boardId: record.boardId, columnId: res, message: 'createColumn' });
    return res;
  } catch (e) {
    console.error('Error in addBoardColumn', e);
  }
}

async function addBoardColumnCard(record) {
  try {
    // console.log('add Board Colomn', record);
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const res = await add.call(this, 'BoardColumnCard', record);
    addBoardActivity(this, db, { userId: record.userId, boardId, cardId: res, timeStamp: Date.now(), columnId: record.boardColumnId, message: 'createCard' });
    return res;
  } catch (e) {
    console.error('Error in addBoardColumnCard', e);
  }
}

async function addBoardColumnCardAttachment(record) {
  try {
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const res = await add.call(this, 'BoardColumnCardAttachment', record);
    addBoardActivity(this, db, { attachmentId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createAttachment' });
    return res;
  } catch (e) {
    console.error('Error in addBoardColumnCardAttachment', e);
  }
}

async function addBoardColumnCardComment(record) {
  try {
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const res = add.call(this, 'BoardColumnCardComment', record);
    addBoardActivity(this, db, { commentId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createComment' });
    return res;
  } catch (e) {
    console.error('Error in addBoardColumnCardComment', e)
  }
}

async function addBoardColumnCardDescription(record) {
  try {
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const res = await add.call(this, 'BoardColumnCardDescription', record);
    addBoardActivity(this, db, { descriptionId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createDescription' });
    return res;
  } catch (e) {
    console.error('Error in addBoardColumnCardDescription')
  }
}

async function addBoardMessageSeenStatus(record) {
  try {
    const res = await add.call(this, 'BoardMessageSeenStatus', record);
    return res;
  } catch (e) {
    console.error('Error in addBoardMessageSeenStatus', e)
  } 
}

async function addBoardMessage(record) {
  try {
    const res = await add.call(this, 'BoardMessage', { ...record, timeStamp: Date.now() });
    return res;
  } catch (e) {
    console.error('Error in addBoardMessage', e)
  }
}

async function addBoardColumnCardTag(record) {
  try {
    const broadCastArr = record.broadCastId.split('-');
    const boardId = broadCastArr[broadCastArr.length - 1];
    const res = await add.call(this, 'BoardColumnCardTag', record);
    addBoardActivity(this, db, { tagId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createTag' });
    return res;
  } catch (e) {
    console.error('Error in addBoardColumnCardTag', e)
  }
}

async function generateReport(record) {
  try {
    const { session } = this;
    const pdfRes = await buildPdfHelper(record, session);
    if (pdfRes) {
      return pdfRes;
    }
    return false;
  } catch (e) {
    console.error('Error in generateReport', e);
  }
}

export default [
  addBoard,
  addBoardColumn,
  addBoardColumnCard,
  addBoardColumnCardAttachment,
  addBoardColumnCardComment,
  addBoardColumnCardDescription,
  addBoardMember,
  addBoardMessage,
  addBoardColumnCardTag,
  addBoardMessageSeenStatus,
  copyBoardColumnCard,
  generateReport,
];
