import store from '../../../../../store';

export default (props, state, data) => {
  // console.log(`${data.uid}) ICECANDIDATE ARRIVED`, data);
  const { apis } = state;
  const { uid, iceCandidate } = data;
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  if (webRtc.peerConnections[uid]) {
    const { pc } = webRtc.peerConnections[uid];
    const iceCand = webRtc.iceCandidates[uid];
    // console.log('local iceCandidate status', iceCand);
    if (iceCandidate && pc.iceCandidateStatus !== 'closed') {
      // Setting the remote iceCandite to the related pc
      iceCandidate.forEach((candidate) => {
        // console.log(`${uid}) REMOTE ICE CANDIDATE`, candidate);
        pc.addCandidate(candidate);
      });

      // Checking Sending the local pc iceCandidate to the remote user
      if (!iceCand) {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { sendStatus: false, doSend: true } });
      } else if (!iceCand.sendStatus && iceCand.isGatherComplete) {
        const finalIceCandidates = iceCand.candidates.map(e => JSON.stringify(e.candidate));
        apis.addIceCandidate(
          {
            iceCandidateDetail: {
              iceCandidate: finalIceCandidates,
              uid: account.user.id,
              broadCastId: webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.localCallHistory.chatHistory.connectionId,
              broadCastType: webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
            },
            userList: [{ userId: uid }],
          }
        );
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true, doSend: false } });
      } else {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: false, doSend: true } });
      }
    }
  }
};
