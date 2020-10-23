/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import onCloseHandler from './onCloseHandler';
import exceptionHandler from './exceptionHandler';

export default (props, state, msg) => {
  // console.log('remote HangupHandler', msg);
  try {
    const { webRtc } = store.getState();
    const { localCallHistory, isLive, showIncommingCall, communicationContainer } = webRtc;
    if (isLive || showIncommingCall || (communicationContainer === 'connecting')) {
      const { type } = localCallHistory.chatHistory;
      if (type === 'user') {
        const { result } = msg;
        const { updateWebRtc } = props;
        const { reason } = result;
        if (reason === 'User busy') {
          const userId = webRtc.localCallHistory.chatHistory.user.user.id;
          updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { ...webRtc.connectedUsers[userId], status: 'busy' } });
        }
        if (reason === 'Remote WebRTC hangup') {
          onCloseHandler(props)('remoteHangup');
        }
      }
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 139 });
  }
};
