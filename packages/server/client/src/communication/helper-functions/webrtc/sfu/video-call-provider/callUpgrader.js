/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import createOffer from './createOffer';
import exceptionHandler from './exceptionHandler';

export default async (mediaType, props) => {
  console.log('callUpgrade called', mediaType);
  try {
    const { webRtc, account } = store.getState();
    const { janus } = webRtc;
    if (mediaType === 'mute' || mediaType === 'unmute') {
      if (mediaType === 'mute') {
        janus.oneToOneCall.muteAudio();
      }
      if (mediaType === 'unmute') {
        janus.oneToOneCall.unmuteAudio();
      }
    } else {
      const { jsep, error, oneToOneCall } = await createOffer(mediaType);
      if (jsep) {
        console.log('setting offer', mediaType);
        oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
        oneToOneCall.send({ message: { request: 'set' }, jsep });
      }

      if (error) {
        throw error;
      }
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 133 });
  }
};
