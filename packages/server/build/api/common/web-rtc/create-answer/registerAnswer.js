'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _cache = require('../../../../cache');

exports.default = (answerDetail, userId) => {
  const { broadCastId, uid } = answerDetail;
  const pc = _cache.liveBoard.getPc(broadCastId, userId, uid);
  // setting fuser is making offer to tuser
  _cache.liveBoard.updatePc(broadCastId, userId, uid, _extends({}, pc, { offer: false, callClose: false }));
  // console.log(`${userId})REGISTER OFFER`, liveBoard.getBoard(broadCastId));
  // console.log(`${userId}) REGISTER ANSWER`, liveBoard.getBoard(broadCastId));
};