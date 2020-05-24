'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _update = require('../../../update/update');

var _update2 = _interopRequireDefault(_update);

var _db = require('../../../../../db');

var _db2 = _interopRequireDefault(_db);

var _addBoardActivity = require('../../../addBoardActivity');

var _addBoardActivity2 = _interopRequireDefault(_addBoardActivity);

var _deleteBoardMember = require('./deleteBoardMember');

var _deleteBoardMember2 = _interopRequireDefault(_deleteBoardMember);

var _cache = require('../../../../../cache/database/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function deleteBoard(record) {
  const { session } = this;
  console.log('delete board called', record);
  const isYourBoard = session.values.user.id === _cache2.default.get('Board').find(b => b.id === parseInt(record.id, 10)).userId;
  if (isYourBoard) {
    const res = await _update2.default.call(this, 'Board', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
    return res;
  }
  const boardMemberid = _cache2.default.get('BoardMember').find(bm => bm.boardId === record.id && bm.tuserId === session.values.user.id);
  _deleteBoardMember2.default.call(this, { id: boardMemberid.id, boardId: record.id, userId: session.values.user.id }, 'leave');
  return 'Class leave successfull';
} /* eslint-disable import/no-cycle */


async function deleteBoardColumn(record) {
  const { session } = this;
  const res = await _update2.default.call(this, 'BoardColumn', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  (0, _addBoardActivity2.default)(this, _db2.default, { userId: session.values.user.id, timeStamp: Date.now(), boardId: record.boardId, columnId: record.id, message: 'deleteColumn' });
  return res;
}

async function deleteBoardColumnCard(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // deleteBoardColumnCardHelper(Delete.bind(this), [record]);
  const res = await _update2.default.call(this, 'BoardColumnCard', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  (0, _addBoardActivity2.default)(this, _db2.default, { userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'deleteCard' });
  return res;
}

async function deleteBoardColumnCardAttachment(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardAttachment', record);
  const res = await _update2.default.call(this, 'BoardColumnCardAttachment', { deleteStatus: true, broadCastId: 1 }, { id: record.id });
  (0, _addBoardActivity2.default)(this, _db2.default, { attachmentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'deleteAttachment' });
  return res;
}

async function deleteBoardColumnCardComment(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardComment', record);
  const res = await _update2.default.call(this, 'BoardColumnCardComment', { deleteStatus: true, broadCastId: 1 }, { id: record.id });
  (0, _addBoardActivity2.default)(this, _db2.default, { commentId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'deleteComment' });
  return res;
}

async function deleteBordColumnDescription(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardDescription', record);
  const res = await _update2.default.call(this, 'BoardColumnCardDescription', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  (0, _addBoardActivity2.default)(this, _db2.default, { descriptionId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.id, message: 'deleteDescripion' });
  return res;
}

async function deleteBoardColumnCardTag(record) {
  const { session } = this;
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  // Delete.call(this, 'BoardColumnCardTag', record);
  const res = await _update2.default.call(this, 'BoardColumnCardTag', { deleteStatus: true, broadCastId: record.broadCastId }, { id: record.id });
  (0, _addBoardActivity2.default)(this, _db2.default, { tagId: record.id, userId: session.values.user.id, timeStamp: Date.now(), boardId, cardId: record.cardId, message: 'deleteTag' });
  return res;
}

exports.default = [deleteBoard, deleteBoardColumn, deleteBoardColumnCard, deleteBoardColumnCardAttachment, deleteBoardColumnCardComment, deleteBordColumnDescription, deleteBoardColumnCardTag, _deleteBoardMember2.default];