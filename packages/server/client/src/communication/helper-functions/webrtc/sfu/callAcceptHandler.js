export default (props, msg) => {
  const { updateWebRtc } = props;
  updateWebRtc('isLive', true);
  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'connecting');
};
