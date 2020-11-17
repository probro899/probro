/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import janusMediaSelector from '../janusMediaSelector';
import exceptionHandler from './exceptionHandler';

export default async (mediaType, props) => {
  console.log('createOffer', mediaType);
  try {
    const { webRtc } = store.getState();
    const janusObj = webRtc.janus;
    if (janusObj) {
      const { oneToOneCall } = janusObj;
      if (oneToOneCall) {
        const createOfferRes = await new Promise((resolve) => {
          oneToOneCall.createOffer(
            {
              media: janusMediaSelector(mediaType),
              success: (jsep) => {
                resolve({ jsep, oneToOneCall });
              },
              error: (error) => {
                resolve({ error });
              },
            }
          );
        });
        return createOfferRes;
      }
      exceptionHandler({ error: 'videocall plugin not found during creating offer', errorCode: 136 }, props);
    } else {
      throw 'Janus Obj not found in webRtc';
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 132 });
  }
};
