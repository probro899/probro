'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUser = require('./getUser');

var _getUser2 = _interopRequireDefault(_getUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (boardId, userId, pcId) => {
  const user = (0, _getUser2.default)(boardId, userId);
  return user[pcId];
};