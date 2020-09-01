import store from '../../../../../store';

export default (props, msg) => {
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  updateWebRtc('isLive', true);
  // updateWebRtc('isConnecting', false);
  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'connecting');
  // console.log('Call Accept Handler called', webRtc);
};
