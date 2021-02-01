import store from '../../../../../store';
import exceptionHandler from '../conference-call-provider/exceptionHandler';

export default (props, state, data) => {
  // console.log('server pinpong called', data);
  try {
    const { webRtc, account } = store.getState();
    const { apis } = webRtc;
    if (webRtc.localCallHistory.chatHistory) {
      if (webRtc.localCallHistory.chatHistory.type === 'board' && data.boardId === webRtc.localCallHistory.chatHistory.connectionId) {
        apis.commPingPong({ userId: account.user.id, boardId: data.boardId });
      }
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 130 });
  }
};
