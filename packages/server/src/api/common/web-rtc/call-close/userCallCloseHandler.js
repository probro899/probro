/* eslint-disable import/no-cycle */
import updateUserCache from '../../updateUserCache';

export default async (insert, callCloseDetail, userList, session) => {
  const insertRes = await insert('UserMessage', {
    tuserId: userList[0].userId,
    fuserId: callCloseDetail.uid,
    connectionId: callCloseDetail.connectionId,
    timeStamp: Date.now(),
    type: callCloseDetail.callType,
    duration: callCloseDetail.callDuration,
  });
  const dataTobeUpdate = {
    UserMessage: {
      id: insertRes,
      tuserId: userList[0].userId,
      fuserId: callCloseDetail.uid,
      connectionId: callCloseDetail.connectionId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration,
    },
  };
  updateUserCache(dataTobeUpdate, session, 'add');
  const channel = session.channel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
  channel.emit('callEnd', callCloseDetail, userList);
};
