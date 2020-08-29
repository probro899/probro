'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closeSocketListner;

var _boardCallClose = require('../../call-close/boardCallClose');

var _boardCallClose2 = _interopRequireDefault(_boardCallClose);

var _callEndMessageAnalyser = require('./callEndMessageAnalyser');

var _callEndMessageAnalyser2 = _interopRequireDefault(_callEndMessageAnalyser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
function closeSocketListner(session, boardId, userId) {
  return function socketCloseListner() {
    const callCloseDetails = (0, _callEndMessageAnalyser2.default)(boardId, userId);
    if (callCloseDetails) {
      (0, _boardCallClose2.default)(callCloseDetails, session);
    }
  };
}