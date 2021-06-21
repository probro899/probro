/* eslint-disable prefer-promise-reject-errors */
import store from '../../../../../store';
import janusMediaSelector from '../janusMediaSelector';
import exceptionHandler from './exceptionHandler';

export default async (mediaType, props) => {
  try {
    const { webRtc, account } = store.getState();
    const janusObj = webRtc.janus;
    if (janusObj) {
      const { oneToOneCall } = janusObj;
      // console.log('janusObj', janusObj);
      if (oneToOneCall) {
        const createAnswerRes = await new Promise((resolve, reject) => {
          oneToOneCall.createAnswer(
            {
              jsep: janusObj.jsep,
              media: janusMediaSelector(mediaType),
              iceRestart: true,
              success: (jsep) => {
                console.log('answer success');
                const body = { request: 'accept' };
                oneToOneCall.send({ message: body, jsep });
                oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
                resolve({ jsep, oneToOneCall });
              },
              error: (error) => {
                console.error('error in answer', error);
                reject(error);
              },
            }
          );
        });
        return createAnswerRes;
      }
      exceptionHandler({ error: 'videocall plugin not found during answering call', errorCode: 136 }, props);
    } else {
      throw 'Janus Obj is not found in web store';
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 134 });
  }
};
