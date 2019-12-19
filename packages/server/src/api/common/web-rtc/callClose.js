/* eslint-disable import/no-cycle */
import db from '../../../db';
import updateUserCache from '../updateUserCache';

export default async function callClose(data) {
  console.log('call close method called', data);
  const { session } = this;
  // console.log('sesssion', session);
  const { callCloseDetail, userList } = data;
  const res = db.execute(async ({ insert }) => {
    if (callCloseDetail.type === 'user') {
      const insertRes = await insert('UserMessage', { tuserId: userList[0].userId, fuserId: callCloseDetail.uid, connectionId: callCloseDetail.connectionId, timeStamp: Date.now(), type: callCloseDetail.callType, duration: callCloseDetail.callDuration });
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
      const userChannel = session.getChannel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
      // console.log('User Chanel in close handler', userChannel);
      const remoteUserSession = userChannel.find(s => s.values.user.id === userList[0].userId);
      updateUserCache(dataTobeUpdate, remoteUserSession, 'add');
      updateUserCache(dataTobeUpdate, session, 'add');
    }
  });
  const channel = session.channel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
  channel.emit('callEnd', data.callCloseDetail, data.userList);
}
