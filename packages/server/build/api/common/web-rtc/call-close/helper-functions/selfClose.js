'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _udpateUserData = require('./udpateUserData');

var _udpateUserData2 = _interopRequireDefault(_udpateUserData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (session, callCloseDetail) => {
  // console.log('Self close called');
  session.unsubscribe(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
  (0, _udpateUserData2.default)(callCloseDetail, session);
};