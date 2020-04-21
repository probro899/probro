'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('../../../../cache');

exports.default = (iceCandidateDetails, userId) => {
  const { broadCastId, uid } = iceCandidateDetails;
  const isClose = _cache.liveBoard.getPc(broadCastId, userId, uid).callClose;
  return isClose;
}; /* eslint-disable import/no-cycle */