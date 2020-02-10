/* eslint-disable import/no-cycle */
import updateUserCache from '../../updateUserCache';

export default async (insert, callCloseDetail, userList, session) => {
  let insertRes = null;
  if (!callCloseDetail.callEndReply) {
    insertRes = await insert('UserMessage', {
      tuserId: userList[0].userId,
      fuserId: callCloseDetail.uid,
      connectionId: callCloseDetail.connectionId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration,
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
      duration: callCloseDetail.callDuration,
    },
  };

  const allUserSession = session.getChannel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
  const remoteSession = allUserSession.find(s => s.values.user.id === userList[0].userId);
  updateUserCache(dataTobeUpdate, session, 'add');
  updateUserCache(dataTobeUpdate, remoteSession, 'add');

  const channel = session.channel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
  channel.emit('callEnd', callCloseDetail, userList);
};
