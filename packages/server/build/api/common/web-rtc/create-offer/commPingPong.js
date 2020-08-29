'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = commPingPong;

var _cache = require('../../../../cache');

function commPingPong(data) {
  console.log('clint ping called', data);
  const board = _cache.liveBoard.getBoard(data.boardId);
  if (board) {
    if (board.users) {
      _cache.liveBoard.setUser(data.boardId, 'users', _extends({}, board.users, { [data.userId]: true }));
    }
  }
  console.log('Board value after ping', _cache.liveBoard.getBoard(data.boardId).users);
}