'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _update = require('../../update');

var _update2 = _interopRequireDefault(_update);

var _db = require('../../../../../db');

var _db2 = _interopRequireDefault(_db);

var _addBoardActivity = require('../../../addBoardActivity');

var _addBoardActivity2 = _interopRequireDefault(_addBoardActivity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateBoard(records) {
  const { session } = this;
  // console.log('updateBoard func', records, session.values);
  const boardId = records[1].id;
  const record = records[0];
  delete record.todo;
  _update2.default.call(this, 'Board', record, records[1]);
  (0, _addBoardActivity2.default)(this, _db2.default, { userId: session.values.user.id, boardId, message: 'updateBoard', timeStamp: Date.now() });
} /* eslint-disable import/no-cycle */


function updateBoardColumn(records) {
  // console.log('update Board Coulumn called', records);
  const { session } = this;
  const record = records[0];
  const broadCastArr = record.broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  _update2.default.call(this, 'BoardColumn', record, records[1]);
  (0, _addBoardActivity2.default)(this, _db2.default, { userId: session.values.user.id, boardId, message: 'updateColumn', timeStamp: Date.now() });
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
  _update2.default.call(this, 'BoardColumnCard', record, records[1]);
  (0, _addBoardActivity2.default)(this, _db2.default, { boardId, userId: session.values.user.id, tColId, fColId, message: todo, cardId, timeStamp: Date.now() });
}

function updateBoardColumnCardAttachment(records) {
  const { session } = this;
  const broadCastArr = records[0].broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const record = records[0];
  const { cardId, todo } = record;
  delete record.cardId;
  delete record.todo;
  _update2.default.call(this, 'BoardColumnCardAttachment', record, records[1]);
  (0, _addBoardActivity2.default)(this, _db2.default, { userId: session.values.user.id, boardId, message: 'updateAttachment', attachmentId: records[1].id, cardId, timeStamp: Date.now() });
}

function updateBoardColumnCardComment(records) {
  _update2.default.call(this, 'BoardColumnCardComment', ...records);
}

function updateBoardColumnCardDescription(records) {
  const { session } = this;
  const broadCastArr = records[0].broadCastId.split('-');
  const boardId = broadCastArr[broadCastArr.length - 1];
  const record = records[0];
  const { boardColumnCardId } = record;
  _update2.default.call(this, 'BoardColumnCardDescription', record, records[1]);
  (0, _addBoardActivity2.default)(this, _db2.default, { userId: session.values.user.id, boardId, message: 'updateDescription', descriptionId: records[1].id, cardId: boardColumnCardId, timeStamp: Date.now() });
}

exports.default = [updateBoard, updateBoardColumn, updateBoardColumnCard, updateBoardColumnCardAttachment, updateBoardColumnCardComment, updateBoardColumnCardDescription];