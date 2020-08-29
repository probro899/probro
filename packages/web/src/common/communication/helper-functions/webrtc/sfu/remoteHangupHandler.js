import store from '../../../../../store';
import onCloseHandler from './onCloseHandler';

export default (props, state, msg) => {
  // console.log('Remote Hangup handler called', msg);
  const { webRtc } = store.getState();
  const { videocall, result } = msg;
  const { updateWebRtc } = props;
  const { reason, username } = result;

  if (reason === 'User busy') {
    const userId = webRtc.localCallHistory.chatHistory.user.user.id;
    updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { ...webRtc.connectedUsers[userId], status: 'busy' } });
  }
  if (reason === 'Remote WebRTC hangup') {
    onCloseHandler(props)('remoteHangup');
  }
};
