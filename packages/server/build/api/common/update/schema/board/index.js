'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _update = require('../../update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateBoard(records) {
  _update2.default.call(this, 'Board', ...records);
}

function updateBoardColumn(records) {
  _update2.default.call(this, 'BoardColumn', ...records);
}

function updateBoardColumnCard(records) {
  // const record = records[0];
  // records.shift();
  _update2.default.call(this, 'BoardColumnCard', ...records);
}

function updateBoardColumnCardAttachment(records) {
  _update2.default.call(this, 'BoardColumnCardAttachment', ...records);
}

function updateBoardColumnCardComment(records) {
  _update2.default.call(this, 'BoardColumnCardComment', ...records);
}

function updateBoardColumnCardDescription(records) {
  _update2.default.call(this, 'BoardColumnCardDescription', ...records);
}

exports.default = [updateBoard, updateBoardColumn, updateBoardColumnCard, updateBoardColumnCardAttachment, updateBoardColumnCardComment, updateBoardColumnCardDescription];