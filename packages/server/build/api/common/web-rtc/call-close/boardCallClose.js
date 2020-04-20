'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _informLiveBoardToClose = require('./helper-functions/informLiveBoardToClose');

var _informLiveBoardToClose2 = _interopRequireDefault(_informLiveBoardToClose);

var _callClose = require('./helper-functions/callClose');

var _callClose2 = _interopRequireDefault(_callClose);

var _selfClose = require('./helper-functions/selfClose');

var _selfClose2 = _interopRequireDefault(_selfClose);

var _cache = require('../../../../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = async (callCloseDetail, session) => {
  const isCloseCall = (0, _informLiveBoardToClose2.default)(callCloseDetail.broadCastId, callCloseDetail.uid);
  // console.log('BoardClose Call', liveBoard.getBoard(callCloseDetail.broadCastId), isCloseCall);
  if (!isCloseCall && _cache.liveBoard.getBoard(callCloseDetail.broadCastId)) {
    (0, _callClose2.default)(session, callCloseDetail);
  } else {
    (0, _selfClose2.default)(session, callCloseDetail);
  }
};