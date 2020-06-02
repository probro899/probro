import store from '../../../../../store';

export default props => async () => {
  const { webRtc } = store.getState();
  const { janus } = webRtc;
  // console.log('Call Close handler called', webRtc);
  const { updateWebRtc } = props;
  updateWebRtc('chatHistory', webRtc.localCallHistory.chatHistory);
  if (webRtc.localCallHistory.stream) {
    if (webRtc.localCallHistory.stream.active) {
      const allTracks = webRtc.localCallHistory.stream.getTracks();
      allTracks.forEach(track => track.stop());
    }
  }
  janus.oneToOneCall.hangup();
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
};
