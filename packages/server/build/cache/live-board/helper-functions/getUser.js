'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getBoard = require('./getBoard');

var _getBoard2 = _interopRequireDefault(_getBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (boarId, userId) => {
  const board = (0, _getBoard2.default)(boarId);
  return board[userId];
};