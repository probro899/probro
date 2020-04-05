import store from '../../../../store';

export default (props, state, apis) => async (remoteData) => {

  const { updateWebRtc, account } = props;
  const { webRtc } = store.getState();
  const pcs = Object.values(webRtc.peerConnections);
  // console.log('close handler called', remoteData, webRtc);
  await updateWebRtc('chatHistory', webRtc.localCallHistory.chatHistory);
  if (webRtc.localCallHistory.stream) {
    if (webRtc.localCallHistory.stream.active) {
      // console.log('inside the local steam stop case');
      const allTracks = webRtc.localCallHistory.stream.getTracks();
      // console.log('all tracks', allTracks);
      allTracks.forEach(track => track.stop());
    }
  }

  if (webRtc.showCommunication) {
    if (webRtc.mediaRecording) {
      webRtc.mediaRecording.stopRecording();
      updateWebRtc('mediaRecording', null);
    }

    // console.log('pcs in close handler', pcs, remoteData);
    if (pcs.length === 0) {
      if (!webRtc.localCallHistory.callEnd) {
        await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callEnd: true });
        if (!remoteData || webRtc.localCallHistory.chatHistory.type === 'board') {
          apis.callClose({
            callCloseDetail: {
              uid: account.user.id,
              broadCastId: webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.localCallHistory.chatHistory.connectionId,
              broadCastType: webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
              callType: webRtc.localCallHistory.callType || 'Misscall',
              callDuration: 0,
              type: webRtc.localCallHistory.chatHistory.type,
              connectionId: webRtc.localCallHistory.chatHistory.connectionId,
              callEndReply: remoteData,
            },
            userList: [{ userId: webRtc.localCallHistory.chatHistory.connectionId  }],
          });
        }
      }
    } else if (!webRtc.localCallHistory.callEnd) {
      await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callEnd: true });
      pcs.forEach(async (pc) => {
        // console.log('data in pc clsoe', webRtc);
        try {
          pc.pc.pc.close();
        } catch (e) {
          console.error('errror in call close handler', e);
        }
      });
      if (!remoteData || webRtc.localCallHistory.chatHistory.type === 'board') {
        apis.callClose({
          callCloseDetail: {
            uid: account.user.id,
            broadCastId: webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.localCallHistory.chatHistory.connectionId,
            broadCastType: webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
            callType: webRtc.localCallHistory.callType || 'Misscall',
            callDuration: webRtc.localCallHistory.startTime ? Date.now() - webRtc.localCallHistory.startTime : 0,
            type: webRtc.localCallHistory.chatHistory.type,
            connectionId: webRtc.localCallHistory.chatHistory.connectionId,
            callEndReply: remoteData,
          },
          userList: [{ userId: webRtc.localCallHistory.chatHistory.type === 'user' ? webRtc.localCallHistory.chatHistory.user.user.id : webRtc.localCallHistory.chatHistory.connectionId }],
        });
      }
    }

    updateWebRtc('communicationContainer', 'history');
    updateWebRtc('outGoingCallType', null);
    updateWebRtc('showOutgoingCall', false);
    updateWebRtc('peerConnections', {});
    updateWebRtc('pendingOffers', []);
    updateWebRtc('remoteStream', {});
    updateWebRtc('currentOffer', null);
    updateWebRtc('iceCandidates', {});
    updateWebRtc('liveIncomingCall', false);
    updateWebRtc('isLive', false);
    updateWebRtc('localCallHistory', { callEnd: true });
    updateWebRtc('mainStreamId', null);
    updateWebRtc('streams', {});
    updateWebRtc('connectedUsers', {});
  } else {
    updateWebRtc('showIncommingCall', false);
  }
};
