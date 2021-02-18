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
import sfuPingPong from '../socket-listner/sfuPingPong';

export default async (mediaType, props) => {
  // console.log('init call called', mediaType);
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
      // apis.sfuPingPong({ boardId: connectionId, userId: account.user.id });
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
        const { isUserInLiveCall } = apis;

        if (!webRtc.liveCallPingTimer) {
          const { updateWebRtc } = props;
          const liveCallPingTimer = setInterval(sfuPingPong, 5000);
          updateWebRtc('liveCallPingTimer', liveCallPingTimer);
        }

        if (webRtc.localCallHistory.callType === 'Incoming') {
          const { joinToken } = createOrJoin;
          const conferenceCall = checkRoomCreated();
          joinRoom(conferenceCall, joinToken, connectionId);
        } else {
          const isIamInCall = await isUserInLiveCall({ userId: account.user.id, boardId: connectionId });
          console.log('is am in call', isIamInCall);
          // start pingpong for live board call
          if (!isIamInCall) {
            const { joinToken } = createOrJoin;
            const conferenceCall = checkRoomCreated();
            joinRoom(conferenceCall, joinToken, connectionId);
          }
        }
      }
      if (createOrJoin.type === 'upgrade') {
        callUpgrader(connectionId, mediaType);
      }
    }
  } catch (e) {
    console.log('execptoin in init call', e);
    exceptionHandler(e, props);
  }
};
