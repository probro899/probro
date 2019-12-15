import store from '../../../../store';

export default (props, state, apis) => async () => {
  const { updateWebRtc, account } = props;
  const { webRtc } = store.getState();
  const pcs = Object.values(webRtc.peerConnections);
  console.log('close handler called', state, apis);
  if (webRtc.localStream) {
    if (webRtc.localStream.active) {
      // console.log('inside the local steam stop case');
      const allTracks = webRtc.localStream.getTracks();
      // console.log('all tracks', allTracks);
      allTracks.forEach(track => track.stop());
    }
  }
  if (webRtc.showCommunication) {
    if (webRtc.mediaRecording) {
      webRtc.mediaRecording.stopRecording();
      updateWebRtc('mediaRecording', null);
    }

    pcs.forEach((pc) => {
      console.log('data in pc clsoe', pc);
      try {
        apis.callClose({
          callCloseDetail: {
            uid: account.user.id,
            broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
            broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
          },
          userList: [{ userId: pc.user.id }],
        });
        pc.pc.pc.close();
      } catch (e) {
        console.error('errror in call close handler', e);
      }
    });

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
