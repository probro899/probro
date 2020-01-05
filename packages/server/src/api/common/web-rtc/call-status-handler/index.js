/* eslint-disable import/no-cycle */
import db from '../../../../db';
import updateUserCache from '../../updateUserCache';

export default async function callStatusChange(data) {
  const { session } = this;
  console.log('data in Call status handler', data);
  const { callStatusDetails, userList } = data;
  const { uid, broadCastId, broadCastType, callType, callDuration, type, connectionId } = callStatusDetails;
  const res = await db.execute(async ({ insert }) => {
    if (broadCastType === 'UserConnection') {
      const dataTodeUpdate = {
        type: 'Outgoing',
        fuserId: userList[0].userId,
        tuserId: uid,
        duration: 0,
        connectionId,
        timeStamp: Date.now(),
      };
      const insertRes = await insert('UserMessage', dataTodeUpdate);
      const allUserSession = session.getChannel(`${broadCastType}-${broadCastId}`);
      const remoteSession = allUserSession.find(s => s.values.user.id === userList[0].userId);
      const dataTobeDispatch = {
        UserMessage: {
          id: insertRes,
          type: 'Outgoing',
          fuserId: userList[0].userId,
          tuserId: uid,
          duration: 0,
          connectionId,
          timeStamp: Date.now(),
          url: null,
          message: null,
          readStatus: null,
        },
      };
      updateUserCache(dataTobeDispatch, remoteSession, 'add');
      updateUserCache(dataTobeDispatch, session, 'add');
      if (type === 'Busy') {
        const channel = session.channel(`${broadCastType}-${broadCastId}`);
        channel.emit('callStatus', callStatusDetails, userList);
      }
      if (type === 'Ringing') {
        const channel = session.channel(`${broadCastType}-${broadCastId}`);
        channel.emit('callStatus', callStatusDetails, userList);
      }
    }
  });
}
