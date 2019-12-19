import store from '../../../../store';

export default (props, state, apis) => async () => {
  console.log('close handler called', state, apis, props);
  const { updateWebRtc, account } = props;
  const { webRtc } = store.getState();
  const pcs = Object.values(webRtc.peerConnections);

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

    console.log('pcs in close handler', pcs);
    if (pcs.length === 0) {
      if (!webRtc.streams[webRtc.chatHistory.user.user.id].callEnd) {
        apis.callClose({
          callCloseDetail: {
            uid: account.user.id,
            broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
            broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
            callType: webRtc.streams[webRtc.chatHistory.user.user.id] ? webRtc.streams[webRtc.chatHistory.user.user.id].callType : 'Misscall',
            callDuration: 0,
            type: webRtc.chatHistory.type,
            connectionId: webRtc.connectionId,
          },
          userList: [{ userId: webRtc.chatHistory.user.user.id }],
        });
      }
    } else {
      pcs.forEach((pc) => {
        console.log('data in pc clsoe', webRtc);
        try {
          if (!webRtc.streams[pc.user.id].callEnd) {
            apis.callClose({
              callCloseDetail: {
                uid: account.user.id,
                broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
                broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
                callType: webRtc.streams[pc.user.id] ? webRtc.localStream.callType : 'Misscall',
                callDuration: webRtc.streams[pc.user.id] ? Date.now() - webRtc.streams[pc.user.id].startTimeStamp : 0,
                type: webRtc.chatHistory.type,
                connectionId: webRtc.connectionId,
              },
              userList: [{ userId: pc.user.id }],
            });
            pc.pc.pc.close();
          }
        } catch (e) {
          console.error('errror in call close handler', e);
        }
      });
    }

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
