'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _deleteColumn = require('./deleteColumn');

var _deleteColumn2 = _interopRequireDefault(_deleteColumn);

var _deleteBoardMessage = require('./deleteBoardMessage');

var _deleteBoardMessage2 = _interopRequireDefault(_deleteBoardMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function deleteBoard(Delete, record) {
  console.log('deleteBoardHandler called', record, Delete);
  const { broadCastId } = record;
  delete record.broadCastId;
  await (0, _deleteColumn2.default)(Delete, { boardId: record.id, broadCastId });
  await Delete('BoardMember', { boardId: record.id, broadCastId });
  await (0, _deleteBoardMessage2.default)(Delete, _extends({}, record, { broadCastId }));
  await Delete('Board', _extends({}, record, { broadCastId }));
};