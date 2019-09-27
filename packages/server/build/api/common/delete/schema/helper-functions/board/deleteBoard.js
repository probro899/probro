'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deleteColumn = require('./deleteColumn');

var _deleteColumn2 = _interopRequireDefault(_deleteColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function deleteBoard(Delete, record) {
  // console.log('deleteBoardHandler called', record, Delete);
  await (0, _deleteColumn2.default)(Delete, { boardId: record.id });
  await Delete('Board', record);
  await Delete('BoardMember', { boardId: record.id });
};