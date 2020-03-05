/* eslint-disable import/no-cycle */
import add from '../../add';
import db from '../../../../../db';
import buildPdfHelper from '../../../../../report-generator';
import addBoardMember from './addBoardMember';
import copyBoardColumnCard from './copyBoardColumnCard';

function addBoardActivity(record) {
  db.execute(async ({ insert }) => {
    insert('BoardActivity', record);
  });
}

async function addBoard(record) {
  const { session } = this;
  const boardId = await add.call(this, 'Board', record);
  await add.call(this, 'BoardMember', { boardId, tuserId: record.userId, fuserId: record.userId, joinStatus: true, timeStamp: Date.now(), userType: 'creator' });
  session.subscribe(`Board-${boardId}`);
  addBoardActivity({ boardId, timeStamp: Date.now(), userId: record.userId, message: 'Create Board' });
  // console.log('boardid in addBorad', boardId);
  return boardId;
}

async function addBoardColumn(record) {
  const res = await add.call(this, 'BoardColumn', record);
  addBoardActivity({ userId: record.userId, timeStamp: Date.now(), boardId: record.boardId, columnId: res, message: 'Create Column' });
  return res;
}

async function addBoardColumnCard(record) {
  // console.log('add Board Colomn', record);
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await add.call(this, 'BoardColumnCard', record);
  addBoardActivity({ userId: record.userId, boardId, cardId: res, timeStamp: Date.now(), columnId: record.boardColumnId, message: 'Create Card' });
  return res;
}

async function addBoardColumnCardAttachment(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await add.call(this, 'BoardColumnCardAttachment', record);
  addBoardActivity({ attachmentId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'Create Attachment' });
  return res;
}

async function addBoardColumnCardComment(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = add.call(this, 'BoardColumnCardComment', record);
  addBoardActivity({ commentId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'Create Comment' });
  return res;
}

async function addBoardColumnCardDescription(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await add.call(this, 'BoardColumnCardDescription', record);
  addBoardActivity({ descriptionId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'Create Description' });
  return res;
}

async function addBoardMessageSeenStatus(record) {
  const res = await add.call(this, 'BoardMessageSeenStatus', record);
  return res;
}

async function addBoardMessage(record) {
  const res = await add.call(this, 'BoardMessage', record);
  return res;
}

async function addBoardColumnCardTag(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await add.call(this, 'BoardColumnCardTag', record);
  addBoardActivity({ tagId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'Create Tag' });
  return res;
}


async function generateReport(record) {
  const { session } = this;
  console.log('generate Report api called', record);
  const pdfRes = await buildPdfHelper(record, session);
  console.log('generated pdf res', pdfRes);
  if (pdfRes) {
    return pdfRes;
  }
  return false;
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
