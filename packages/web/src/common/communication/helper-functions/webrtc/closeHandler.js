import store from '../../../../store';

export default props => async () => {
  // console.log('close handler called');
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  const pcs = Object.values(webRtc.peerConnections);
  if (webRtc.showCommunication) {
    if (webRtc.mediaRecording) {
      webRtc.mediaRecording.stopRecording();
      updateWebRtc('mediaRecording', null);
    }

    pcs.forEach(pc => pc.pc.pc.close());
    updateWebRtc('communicationContainer', 'chat');
    updateWebRtc('outGoingCallType', null);
    updateWebRtc('showOutgoingCall', false);
    updateWebRtc('peerConnections', {});
    updateWebRtc('pendingOffers', []);
    updateWebRtc('remoteStream', {});
    updateWebRtc('currentOffer', null);
    updateWebRtc('iceCandidates', {});
    updateWebRtc('liveIncomingCall', false);
    updateWebRtc('isLive', false);
  } else {
    updateWebRtc('showIncommingCall', false);
  }
};
