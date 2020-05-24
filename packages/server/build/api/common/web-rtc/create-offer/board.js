'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('@probro/common/source/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _updateUserCache = require('../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

var _cache = require('../../../../cache');

var _registerUser = require('./helper-functions/registerUser');

var _registerUser2 = _interopRequireDefault(_registerUser);

var _socketCloseListner = require('./helper-functions/socketCloseListner');

var _socketCloseListner2 = _interopRequireDefault(_socketCloseListner);

var _registerOffer = require('./helper-functions/registerOffer');

var _registerOffer2 = _interopRequireDefault(_registerOffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = (session, data) => {
  const { offerDetail } = data;

  // Checking either do offer or not
  const doOffer = (0, _registerUser2.default)(offerDetail, data.userList[0].userId, session);
  if (doOffer) {
    const allBoardUserSession = session.getChannel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
    const liveBoardChannelBefore = session.getChannel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

    if (!liveBoardChannelBefore) {
      // console.log('Offer Lelel 1');
      allBoardUserSession.forEach(s => s.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));

      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      liveBoardChannel.emit('offer', data.offerDetail, data.userList);

      const allLiveSessions = session.getChannel(`Board-${offerDetail.broadCastId}`);

      allLiveSessions.forEach(s => (0, _updateUserCache2.default)({ Board: { id: offerDetail.broadCastId, activeStatus: offerDetail.uid } }, s, 'update'));

      // udpate active status true in cache database
      _cache.database.update('Board', _schema2.default.update('Board', { id: offerDetail.broadCastId, activeStatus: offerDetail.uid }));

      // update live Board to isLive value to current calling user
      // liveBoard.setBoard(offerDetail.broadCastId, { ...liveBoard.getBoard(offerDetail.broadCastId), isLive: offerDetail.uid });

      // add socket Close listner
      allBoardUserSession.forEach(s => s.addCloseListener((0, _socketCloseListner2.default)(session, offerDetail.broadCastId, s.values.user.id)));

      // Regiter Offer in cache
      (0, _registerOffer2.default)(offerDetail, data.userList[0].userId);
    } else if (liveBoardChannelBefore.length <= 1) {
      // console.log('Offer Level 2');
      // console.log('inside one session board');
      liveBoardChannelBefore.forEach(s => s.unsubscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));

      allBoardUserSession.forEach(s => s.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));

      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      liveBoardChannel.emit('offer', data.offerDetail, data.userList);

      // Regiter Offer in cache
      (0, _registerOffer2.default)(offerDetail, data.userList[0].userId);
    } else {
      // console.log('Offer Level 3');
      session.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      if (offerDetail.isLive) {
        const allLiveSessions = session.getChannel(`Board-${offerDetail.broadCastId}`);

        allLiveSessions.forEach(s => (0, _updateUserCache2.default)({ Board: { id: offerDetail.broadCastId, activeStatus: offerDetail.uid } }, s, 'update'));

        // liveBoard.setBoard(offerDetail.broadCastId, { ...liveBoard.getBoard(offerDetail.broadCastId), isLive: offerDetail.uid });

        _cache.database.update('Board', _schema2.default.update('Board', { id: offerDetail.broadCastId, activeStatus: offerDetail.uid }));
      }

      liveBoardChannel.emit('offer', data.offerDetail, data.userList);

      // Regiter Offer in cache
      (0, _registerOffer2.default)(offerDetail, data.userList[0].userId);
    }
  }
  // console.log('Live Board details', data.userList[0].userId, doOffer, liveBoard.getBoard(offerDetail.broadCastId));
};