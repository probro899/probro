import store from '../../../../../store';

export default props => (data) => {
  // console.log('onCLose handler called', data);
  const { webRtc } = store.getState();
  const { janus } = webRtc;
  // console.log('onClose Close handler called');
  const { updateWebRtc } = props;
  updateWebRtc('chatHistory', webRtc.localCallHistory.chatHistory);
  if (webRtc.localCallHistory.stream) {
    if (webRtc.localCallHistory.stream.active) {
      // console.log('inside the local steam stop case');
      const allTracks = webRtc.localCallHistory.stream.getTracks();
      // console.log('all tracks', allTracks);
      allTracks.forEach(track => track.stop());
    }
  }

  updateWebRtc('communicationContainer', 'history');
  updateWebRtc('outGoingCallType', null);
  updateWebRtc('showOutgoingCall', false);
  updateWebRtc('peerConnections', {});
  updateWebRtc('pendingOffers', {});
  updateWebRtc('remoteStream', {});
  updateWebRtc('currentOffer', null);
  updateWebRtc('iceCandidates', {});
  updateWebRtc('liveIncomingCall', false);
  updateWebRtc('isLive', false);
  updateWebRtc('localCallHistory', { callEnd: true });
  updateWebRtc('mainStreamId', null);
  updateWebRtc('streams', {});
  updateWebRtc('connectedUsers', {});
  updateWebRtc('isConnecting', false);
  updateWebRtc('showIncommingCall', false);
};
