'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _cache = require('../../../../../cache');

var _checkAndCloseBoard = require('./checkAndCloseBoard');

var _checkAndCloseBoard2 = _interopRequireDefault(_checkAndCloseBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (boardId, userId) => {
  const board = _cache.liveBoard.getBoard(boardId);

  if (board) {
    const userpcs = board[userId];

    if (userpcs) {
      const allUser = Object.keys(userpcs);
      allUser.forEach(uid => {
        _cache.liveBoard.updatePc(boardId, userId, uid, _extends({}, _cache.liveBoard.getPc(boardId, userId, uid), { callClose: true }));
      });

      const isCloseCall = (0, _checkAndCloseBoard2.default)(_cache.liveBoard, boardId, userId);
      return isCloseCall;
    }
  }
};