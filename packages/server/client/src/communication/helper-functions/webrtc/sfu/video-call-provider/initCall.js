/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';
import callUpgrader from './callUpgrader';
import createOffer from './createOffer';

export default async (mediaType, props) => {
  try {
    const { webRtc, account, database } = store.getState();
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
        const { callId } = Object.values(database.UserConnection.byId).find(c => c.user.user.id === userId);
        if (callId) {
          const body = { request: 'call', username: `${callId}` };
          oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
          oneToOneCall.send({ message: body, jsep });
        } else {
          // ask for callId
          const { apis } = webRtc;
          const callId =  await apis.getCallId({ userId });
          const body = { request: 'call', username: `${callId}` };
          oneToOneCall.data({ text: JSON.stringify({ callType: mediaType, uid: account.user.id }) });
          oneToOneCall.send({ message: body, jsep });
        }
      }
      if (error) {
        throw error;
      }
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 131 });
  }
};
