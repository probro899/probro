/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
import updateUserCache from '../../../updateUserCache';
import updateDatabaseCache from '../../../../../cache/database/update';
import schema from '@probro/common/src/schema';
import db from '../../../../../db';

export default async (callCloseDetail, userList, session) => {
  try {
    const insertRes = await db.execute(async ({ insert }) => {
      const res = await insert('UserMessage', {
        tuserId: userList[0].userId,
        fuserId: callCloseDetail.uid,
        connectionId: callCloseDetail.connectionId,
        timeStamp: Date.now(),
        type: callCloseDetail.callType,
        duration: callCloseDetail.callDuration,
      });
      return res;
    });
  
    // console.log('User clase handler called', callCloseDetail, userList, 'insert res', insertRes);
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
  
    updateDatabaseCache('UserMessage', schema.add('UserMessage', dataTobeUpdate.UserMessage));
  
    const allUserSession = session.getChannel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
    const remoteSession = allUserSession.find(s => s.values.user.id === userList[0].userId);
    updateUserCache(dataTobeUpdate, session, 'add');
    updateUserCache(dataTobeUpdate, remoteSession, 'add');
  
    // const channel = session.channel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
    // channel.emit('callEnd', callCloseDetail, userList);
  } catch (e) {
    console.error('Error userCloseHandler', e);
  }
};
