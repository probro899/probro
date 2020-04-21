'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _udpateUserData = require('./udpateUserData');

var _udpateUserData2 = _interopRequireDefault(_udpateUserData);

var _updateUserCache = require('../../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

var _update = require('../../../../../cache/database/update');

var _update2 = _interopRequireDefault(_update);

var _schema = require('@probro/common/source/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _cache = require('../../../../../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/order
exports.default = async (session, callCloseDetail) => {
  // console.log('Board close Call', callCloseDetail);

  const channel = session.channel(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);

  // update User data to database and cache
  await (0, _udpateUserData2.default)(callCloseDetail, session);

  // gather all the acitve boardUser
  const allLiveSessions = session.getChannel(`Board-${callCloseDetail.broadCastId}`);
  // console.log('AllLive sessions', allLiveSessions);

  // final call end to the live channel
  channel.emit('callEnd', callCloseDetail, null, callCloseDetail.uid);

  // saying all  user to board active false
  if (allLiveSessions) {
    allLiveSessions.forEach(s => (0, _updateUserCache2.default)({ Board: { id: callCloseDetail.broadCastId, activeStatus: false } }, s, 'update'));
    // unsubscribe the all user from board
    allLiveSessions.forEach(s => s.unsubscribe(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`));
  }

  // upate own session to active false
  (0, _update2.default)('Board', _schema2.default.update('Board', { id: callCloseDetail.broadCastId, activeStatus: false }));

  // update live cache to empty
  _cache.liveBoard.setBoard(callCloseDetail.broadCastId, {});
}; /* eslint-disable import/no-cycle */