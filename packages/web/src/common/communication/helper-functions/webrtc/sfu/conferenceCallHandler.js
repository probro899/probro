/*
No of state while making call
1) initiative call that means no user in class room
2) join class room that means first join
3) re-join class room that means leave and join again
*/

import uuid from 'uuid';
import store from '../../../../../store';
import createClassHandler from './createClassHandler';
import classJoinHandler from './classJoinHandler';
import Janus from '../../../../../webrtc/sfu/janus';
import janusMediaSelector from './janusMediaSelector';
import classAttachAndJoin from './classAttachAndJoin';
import sfuPingPong from './socket-listner/sfuPingPong';

export default async (mediaType, preMediaType, state, props) => {
  try {
    const { apis } = state;
    const { webRtc, database, account } = store.getState();
    const { janus, localCallHistory, isCallUpgraded } = webRtc;
    const boardId = localCallHistory.chatHistory.connectionId;
    const { joinToken, activeStatus } = database.Board.byId[boardId];
    const { conferenceCall } = janus;
    apis.sfuPingPong({ boardId, userId: account.user.id });
    if (isCallUpgraded) {
      // console.log('CALL UPGRADE', mediaType, preMediaType);
      if (mediaType === 'mute' || mediaType === 'unmute') {
        if (mediaType === 'mute') {
          conferenceCall.muteAudio();
        }
        if (mediaType === 'unmute') {
          conferenceCall.unmuteAudio();
        }
      } else {
        conferenceCall.createOffer(
          {
            media: janusMediaSelector(mediaType, preMediaType),
            success: (jsep) => {
              conferenceCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
              Janus.log('upgrade success', jsep);
              conferenceCall.send({ message: { request: 'configure' }, jsep });
            },
            error: (error) => {
              // An error occurred...
              Janus.error('Error creatign offer', error);
            },
          }
        );
        apis.initSfuCall({ activeStatus: account.user.id, id: boardId, isCallUpgraded, mediaType: localCallHistory.mediaType });
      }
    } else if (!conferenceCall) {
      // Re-join state
      Janus.log('Class attach and join');
      classAttachAndJoin(state, props);
      if (!activeStatus) {
        apis.initSfuCall({ id: boardId, activeStatus: account.user.id, mediaType: localCallHistory.mediaType });
      }
    } else if (activeStatus && conferenceCall) {
      // first join state
      Janus.log('Class join');
      classJoinHandler(joinToken);
    } else if (conferenceCall) {
      // initiative call state
      Janus.log('Class call', janus);
      createClassHandler(apis);
    }
  } catch (e) {
    Janus.error('ConferenceCall Error', e);
  }
};
