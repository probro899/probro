/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import connectionIdProvider from './connectionIdProvider';
import checkCreateOrJoin from './checkCreateOrJoin';
import checkRoomCreated from './checkRoomCreated';
import createRoom from './createRoom';
import editRoom from './editRoom';
import joinRoom from './joinRoom';
import callUpgrader from './callUpgrader';
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';
import isJanusConnected from '../isJanusConnected';

export default async (mediaType, props) => {
  try {
    const isJanusConnectedRes = await isJanusConnected(props);
    if (isJanusConnectedRes) {
      const connectionId = connectionIdProvider();
      const createOrJoin = checkCreateOrJoin(connectionId);
      let roomEditRes;
      let roomCreateRes;
      const { webRtc, account } = store.getState();
      const userId = account.user.id;
      const { apis } = webRtc;
      apis.sfuPingPong({ boardId: connectionId, userId: account.user.id });
      if (createOrJoin.type === 'create') {
        const conferenceCall = checkRoomCreated();
        if (conferenceCall) {
          roomEditRes = await editRoom(connectionId, conferenceCall);
          const { error, error_code, room, joinToken } = roomEditRes;
          if (room && joinToken) {
            joinRoom(conferenceCall, joinToken, room);
            apis.initSfuCall({ activeStatus: userId, id: room, joinToken, mediaType: webRtc.localCallHistory.mediaType });
          } else if (error && error_code === 426) {
            roomCreateRes = await createRoom(connectionId, conferenceCall);
            const { error, error_code, room, joinToken } = roomCreateRes;
            if (room && joinToken) {
              joinRoom(conferenceCall, joinToken, room);
              apis.initSfuCall({ activeStatus: userId, id: room, joinToken, mediaType: webRtc.localCallHistory.mediaType });
            }
            if (error && error_code) {
              throw roomCreateRes;
            }
          } else {
            throw roomEditRes;
          }
        }
      }
      if (createOrJoin.type === 'join') {
        const { joinToken } = createOrJoin;
        const conferenceCall = checkRoomCreated();
        joinRoom(conferenceCall, joinToken, connectionId);
      }
      if (createOrJoin.type === 'upgrade') {
        callUpgrader(connectionId, mediaType);
      }
    }
  } catch (e) {
    exceptionHandler(e, props);
  }
};
