'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

var _db = require('../../../../../db');

var _db2 = _interopRequireDefault(_db);

var _reportGenerator = require('../../../../../report-generator');

var _reportGenerator2 = _interopRequireDefault(_reportGenerator);

var _addBoardMember = require('./addBoardMember');

var _addBoardMember2 = _interopRequireDefault(_addBoardMember);

var _copyBoardColumnCard = require('./copyBoardColumnCard');

var _copyBoardColumnCard2 = _interopRequireDefault(_copyBoardColumnCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addBoardActivity(record) {
  _db2.default.execute(async ({ insert }) => {
    insert('BoardActivity', record);
  });
}

async function addBoard(record) {
  const { session } = this;
  // console.log('user type', session.values.user.type);
  const boardId = await _add2.default.call(this, 'Board', _extends({ type: session.values.user.type === 'admin' ? 'template' : 'private' }, record));
  await _add2.default.call(this, 'BoardMember', { boardId, tuserId: record.userId, fuserId: record.userId, joinStatus: true, timeStamp: Date.now(), userType: 'creator' });
  session.subscribe(`Board-${boardId}`);
  addBoardActivity({ boardId, timeStamp: Date.now(), userId: record.userId, message: 'createBoard' });
  // console.log('boardid in addBorad', boardId);
  return boardId;
}

async function addBoardColumn(record) {
  const res = await _add2.default.call(this, 'BoardColumn', record);
  addBoardActivity({ userId: record.userId, timeStamp: Date.now(), boardId: record.boardId, columnId: res, message: 'createColumn' });
  return res;
}

async function addBoardColumnCard(record) {
  // console.log('add Board Colomn', record);
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await _add2.default.call(this, 'BoardColumnCard', record);
  addBoardActivity({ userId: record.userId, boardId, cardId: res, timeStamp: Date.now(), columnId: record.boardColumnId, message: 'createCard' });
  return res;
}

async function addBoardColumnCardAttachment(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await _add2.default.call(this, 'BoardColumnCardAttachment', record);
  addBoardActivity({ attachmentId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createAttachment' });
  return res;
}

async function addBoardColumnCardComment(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = _add2.default.call(this, 'BoardColumnCardComment', record);
  addBoardActivity({ commentId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createComment' });
  return res;
}

async function addBoardColumnCardDescription(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await _add2.default.call(this, 'BoardColumnCardDescription', record);
  addBoardActivity({ descriptionId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createDescription' });
  return res;
}

async function addBoardMessageSeenStatus(record) {
  const res = await _add2.default.call(this, 'BoardMessageSeenStatus', record);
  return res;
}

async function addBoardMessage(record) {
  const res = await _add2.default.call(this, 'BoardMessage', record);
  return res;
}

async function addBoardColumnCardTag(record) {
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const res = await _add2.default.call(this, 'BoardColumnCardTag', record);
  addBoardActivity({ tagId: res, userId: record.userId, timeStamp: Date.now(), boardId, cardId: record.boardColumnCardId, message: 'createTag' });
  return res;
}

async function generateReport(record) {
  const { session } = this;
  const pdfRes = await (0, _reportGenerator2.default)(record, session);
  if (pdfRes) {
    return pdfRes;
  }
  return false;
}

exports.default = [addBoard, addBoardColumn, addBoardColumnCard, addBoardColumnCardAttachment, addBoardColumnCardComment, addBoardColumnCardDescription, _addBoardMember2.default, addBoardMessage, addBoardColumnCardTag, addBoardMessageSeenStatus, _copyBoardColumnCard2.default, generateReport];