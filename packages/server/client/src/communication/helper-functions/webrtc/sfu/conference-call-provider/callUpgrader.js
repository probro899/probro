/* eslint-disable import/no-cycle */
import janusMediaSelector from '../janusMediaSelector';
import store from '../../../../../store';
import exceptionHanlder from './exceptionHandler';

export default (boardId, mediaType) => {
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
        conferenceCall.createOffer(
          {
            media: janusMediaSelector(mediaType),
            success: (jsep) => {
              conferenceCall.data({ text: JSON.stringify({ callType: localCallHistory.mediaType, uid: account.user.id }) });
              conferenceCall.send({ message: { request: 'configure' }, jsep });
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
        apis.initSfuCall({ activeStatus: account.user.id, id: boardId, isCallUpgraded, mediaType: localCallHistory.mediaType });
      }
    } else {
      throw 'Conference plugin not found';
    }
  } catch (e) {
    exceptionHanlder({ error: JSON.stringify(e), errorCode: 143 });
  }
};
