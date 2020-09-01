import store from '../../../../../store';

export default props => (stream) => {
  // console.log('onLocalStreamHandler called', stream);
  const { webRtc, account } = store.getState();
  const { updateWebRtc } = props;
  updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, stream, callEnd: false });
  updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { streams: [stream] } });
};
