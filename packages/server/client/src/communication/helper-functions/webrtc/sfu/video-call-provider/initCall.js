/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';
import callUpgrader from './callUpgrader';
import createOffer from './createOffer';

export default async (mediaType, props) => {
  try {
    const { webRtc, account } = store.getState();
    const { localCallHistory } = webRtc;
    let userId;
    if (localCallHistory) {
      const { chatHistory } = localCallHistory;
      if (chatHistory) {
        userId = chatHistory.user.user.id;
      }
    }

    if (!userId) {
      throw 'User not found';
    }

    if (webRtc.isCallUpgraded) {
      callUpgrader(mediaType, props);
    } else {
      const { jsep, error, oneToOneCall } = await createOffer(mediaType, props);
      if (jsep) {
        const body = { request: 'call', username: `${userId}` };
        oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
        oneToOneCall.send({ message: body, jsep });
      }

      if (error) {
        throw error;
      }
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 131 });
  }
};
