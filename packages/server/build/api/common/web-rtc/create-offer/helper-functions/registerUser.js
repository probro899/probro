'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('../../../../../cache');

const initializeUser = (boardId, userId, pcId) => {
  if (!_cache.liveBoard.getBoard(boardId)) {
    _cache.liveBoard.setBoard(boardId, {});
  }

  if (!_cache.liveBoard.getUser(boardId, userId)) {
    _cache.liveBoard.setUser(boardId, userId, {});
  }

  if (!_cache.liveBoard.getPc(boardId, userId, pcId)) {
    _cache.liveBoard.setPc(boardId, userId, pcId, {});
  }
}; /* eslint-disable import/no-cycle */

exports.default = (offerDetail, userId) => {
  const { broadCastId, uid, isLive } = offerDetail;
  // console.log('User registercalled', broadCastId, uid, userId, isLive);
  // initialize fUser
  initializeUser(broadCastId, uid, userId);

  // initialize tUser
  initializeUser(broadCastId, userId, uid);

  // checking is tuser made offer to me
  const { callClose } = _cache.liveBoard.getPc(broadCastId, userId, uid);

  const { offer } = _cache.liveBoard.getPc(broadCastId, userId, uid);
  // console.log('offer and callClose', offer, callClose);

  if (callClose) {
    return false;
  }

  if (isLive) {
    return true;
  }

  return !offer;
};