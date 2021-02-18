/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import exceptionHandler from '../conference-call-provider/exceptionHandler';

export default () => {
  // console.log('server pinpong called');
  try {
    const { webRtc, account } = store.getState();
    const { apis } = webRtc;
    if (webRtc.localCallHistory.chatHistory) {
      if (webRtc.localCallHistory.chatHistory.type === 'board' && webRtc.localCallHistory.chatHistory.connectionId) {
        apis.commPingPong({ userId: account.user.id, boardId: webRtc.localCallHistory.chatHistory.connectionId });
      }
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 130 });
  }
};
