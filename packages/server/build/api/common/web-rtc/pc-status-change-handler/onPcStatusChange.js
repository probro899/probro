'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _cache = require('../../../../cache');

exports.default = async function onPcStatusChange({ boardId, userId, pcId, status }) {
  const pc = _cache.liveBoard.getPc(boardId, userId, pcId);
  // check if satatus is connected then put start time
  if (status === 'connected' && !pc.startTime) {
    _cache.liveBoard.updatePc(boardId, userId, pcId, _extends({}, pc, { status, startTime: Date.now() }));
  } else {
    _cache.liveBoard.updatePc(boardId, userId, pcId, _extends({}, pc, { status }));
  }
  // console.log('Board after status change', liveBoard.getBoard(boardId));
};