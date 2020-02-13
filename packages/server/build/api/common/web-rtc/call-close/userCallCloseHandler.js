'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _updateUserCache = require('../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (insert, callCloseDetail, userList, session) => {
  let insertRes = null;
  if (!callCloseDetail.callEndReply) {
    insertRes = await insert('UserMessage', {
      tuserId: userList[0].userId,
      fuserId: callCloseDetail.uid,
      connectionId: callCloseDetail.connectionId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration
    });
  }

  const dataTobeUpdate = {
    UserMessage: {
      id: insertRes || Date.now(),
      tuserId: userList[0].userId,
      fuserId: callCloseDetail.uid,
      connectionId: callCloseDetail.connectionId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration
    }
  };

  const allUserSession = session.getChannel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
  const remoteSession = allUserSession.find(s => s.values.user.id === userList[0].userId);
  (0, _updateUserCache2.default)(dataTobeUpdate, session, 'add');
  (0, _updateUserCache2.default)(dataTobeUpdate, remoteSession, 'add');

  const channel = session.channel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
  channel.emit('callEnd', callCloseDetail, userList);
}; /* eslint-disable import/no-cycle */