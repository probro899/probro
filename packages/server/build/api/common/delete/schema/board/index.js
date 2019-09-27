'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delete = require('../../delete');

var _delete2 = _interopRequireDefault(_delete);

var _deleteBoard = require('../helper-functions/board/deleteBoard');

var _deleteBoard2 = _interopRequireDefault(_deleteBoard);

var _deleteColumn = require('../helper-functions/board/deleteColumn');

var _deleteColumn2 = _interopRequireDefault(_deleteColumn);

var _deleteBoardColumnCard = require('../helper-functions/board/deleteBoardColumnCard');

var _deleteBoardColumnCard2 = _interopRequireDefault(_deleteBoardColumnCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
function deleteBoard(record) {
  // console.log('delete board handler', record);
  const dbDelete = _delete2.default.bind(this);
  (0, _deleteBoard2.default)(dbDelete, record);
}

function deleteBoardColumn(record) {
  // console.log('record in deleteBoardColumn', record);
  const dbColDelete = _delete2.default.bind(this);
  (0, _deleteColumn2.default)(dbColDelete, record);
}

function deleteBoardColumnCard(record) {
  (0, _deleteBoardColumnCard2.default)(_delete2.default.bind(this), [record]);
}

function deleteBoardColumnCardAttachment(record) {
  _delete2.default.call(this, 'BoardColumnCardAttachment', record);
}

function deleteBoardColumnCardComment(record) {
  _delete2.default.call(this, 'BoardColumnCardComment', record);
}

function deleteBordColumnDescription(record) {
  _delete2.default.call(this, 'BoardColumnCardDescription', record);
}

exports.default = [deleteBoard, deleteBoardColumn, deleteBoardColumnCard, deleteBoardColumnCardAttachment, deleteBoardColumnCardComment, deleteBordColumnDescription];