/* eslint-disable import/no-cycle */
import janusMediaSelector from '../janusMediaSelector';
import store from '../../../../../store';
import exceptionHanlder from './exceptionHandler';

export default (boardId, mediaType, doNotUpgrade) => {
  try {
    const { webRtc, account } = store.getState();
    const { localCallHistory, apis, janus, isCallUpgraded } = webRtc;
    const { conferenceCall } = janus;
    if (conferenceCall) {
      if (mediaType === 'mute' || mediaType === 'unmute') {
        if (mediaType === 'mute') {
          conferenceCall.muteAudio();
        }
        if (mediaType === 'unmute') {
          conferenceCall.unmuteAudio();
        }
      } else {
        // console.log('conference call upgrade called');
        conferenceCall.createOffer(
          {
            media: janusMediaSelector(mediaType),
            success: (jsep) => {
              if (!doNotUpgrade) {
                conferenceCall.data({ text: JSON.stringify({ callType: localCallHistory.mediaType, uid: account.user.id, type: 'callUpgrade' }) });
              }
              conferenceCall.send({ message: { request: 'configure', bitrate: 512000 }, jsep });
            },
            error: (error) => {
              if (error.name) {
                exceptionHanlder({ error: error.name, errorCode: 143 });
              } else {
                throw error;
              }
            },
          }
        );
        if (!doNotUpgrade) {
          apis.initSfuCall({ activeStatus: account.user.id, id: boardId, isCallUpgraded, mediaType: localCallHistory.mediaType });
        }
      }
    } else {
      throw 'Conference plugin not found';
    }
  } catch (e) {
    exceptionHanlder({ error: JSON.stringify(e), errorCode: 143 });
  }
};
