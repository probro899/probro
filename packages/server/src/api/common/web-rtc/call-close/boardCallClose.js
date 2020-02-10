/* eslint-disable import/no-cycle */
import schema from '@probro/common/source/src/schema';
import updateUserCache from '../../updateUserCache';

const updateUserData = async (insert, callCloseDetail, session) => {
  const insertRes = await insert('BoardMessage', {
    userId: callCloseDetail.uid,
    boardId: callCloseDetail.broadCastId,
    timeStamp: Date.now(),
    type: callCloseDetail.callType,
    duration: callCloseDetail.callDuration,
    message: callCloseDetail.callType,
  });
  const dataTobeUpdate = {
    BoardMessage: {
      id: insertRes,
      userId: callCloseDetail.uid,
      boardId: callCloseDetail.broadCastId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration,
      message: callCloseDetail.callType,
    },
  };
  updateUserCache(dataTobeUpdate, session, 'add');
};

export default async (insert, callCloseDetail, userList, session) => {
  console.log('close details', callCloseDetail);
  const channelSessionBefore = session.getChannel(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
  console.log('live channel session before', channelSessionBefore.length);
  if (channelSessionBefore.length <= 2) {
    console.log('less than two users are connected in board', channelSessionBefore.length);
    const channel = session.channel(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
    const allSessions = session.getChannel(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);

    // say all user to bay bay
    // allSessions.forEach(s => updateUserData(insert, callCloseDetail, s));

    session.unsubscribe(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
    await updateUserData(insert, callCloseDetail, session);

    const allLiveSessions = session.getChannel(`Board-${callCloseDetail.broadCastId}`);
    allLiveSessions.forEach(s => updateUserCache({ Board: { id: callCloseDetail.broadCastId, activeStatus: false } }, s, 'update'));

    // session.channel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`).dispatch(schema.update('Board', { id: callCloseDetail.broadCastId, activeStatus: false }));
    channel.emit('callEnd', callCloseDetail);
  }

  if (channelSessionBefore.length > 2) {
    console.log('more than two user are live', channelSessionBefore.length);
    const channel = session.channel(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
    session.unsubscribe(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
    await updateUserData(insert, callCloseDetail, session);
  }
};
