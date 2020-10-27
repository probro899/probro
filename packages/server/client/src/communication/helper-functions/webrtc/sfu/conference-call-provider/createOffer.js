/* eslint-disable import/no-cycle */
import janusMediaSelector from '../janusMediaSelector';
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';

export default async (conferenceCall) => {
  const { webRtc } = store.getState();
  const { localCallHistory } = webRtc;
  try {
    const res = await new Promise((resolve) => {
      conferenceCall.createOffer(
        {
          // Add data:true here if you want to publish datachannels as well
          media: janusMediaSelector(localCallHistory.mediaType), // Publishers are sendonly
          success: (jsep) => {
            const publish = { request: 'configure', audio: true, video: true };
            conferenceCall.send({ message: publish, jsep });
            resolve({ success: true, jsep });
          },
          error: (error) => {
            resolve({ error, errorCode: 111 });
          },
        }
      );
    });
    return res;
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 116 });
  }
};
