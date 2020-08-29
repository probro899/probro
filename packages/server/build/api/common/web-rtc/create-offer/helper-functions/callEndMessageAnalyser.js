'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cache = require('../../../../../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = (boardId, userId) => {
  const board = _cache.liveBoard.getBoard(boardId);
  // console.log('Call end Anyliser called', board);
  if (board) {
    const user = board[userId];
    if (user) {
      const isClose = Object.values(user).find(pc => !pc.callClose);
      if (isClose) {
        const callType = Object.values(user).find(pc => !pc.offer) ? 'Incoming' : 'Outgoing';
        const startTime = _lodash2.default.min(Object.values(user).map(pc => pc.startTime).filter(t => t));
        const callDuration = Date.now() - startTime;
        return { callType, callDuration, uid: userId, broadCastId: boardId };
      }
    }
  }
  return null;
};