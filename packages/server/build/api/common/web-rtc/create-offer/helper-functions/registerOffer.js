'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('../../../../../cache');

exports.default = (offerDetail, userId) => {
  const { broadCastId, uid } = offerDetail;
  const { offer } = _cache.liveBoard.getPc(broadCastId, userId, uid);

  if (!offer) {
    // setting fuser is making offer to tuser
    _cache.liveBoard.updatePc(broadCastId, uid, userId, { offer: true, callClose: false });
  }
  // console.log(`${userId})REGISTER OFFER`, liveBoard.getBoard(broadCastId));
}; /* eslint-disable import/no-cycle */