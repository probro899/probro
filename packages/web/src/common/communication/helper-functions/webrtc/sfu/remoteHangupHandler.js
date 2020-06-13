import store from '../../../../../store';
import onCloseHandler from './onCloseHandler';

export default (props, state, msg) => {
  console.log('Remote Hangup handler called', msg);
  const { webRtc } = store.getState();
  const { videocall, result } = msg;
  const { updateWebRtc } = props;
  const { reason, username } = result;
  const userId = webRtc.localCallHistory.chatHistory.user.user.id;
  if (reason === 'User busy') {
    console.log('inside user busy state');
    updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { ...webRtc.connectedUsers[userId], status: 'busy' } });
  }
  if (reason === 'Remote WebRTC hangup') {
    console.log('on remote hangup');
    onCloseHandler(props)('remoteHangup');
  }
};
