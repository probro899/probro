import store from '../../../../../store';

export default (props, state, data) => {
console.log('icecandidate Arrived', data);
  const { apis } = state;
  const { uid, iceCandidate } = data;
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  const { pc } = webRtc.peerConnections[uid];
  const iceCand = webRtc.iceCandidates[uid];
  // console.log('local iceCandidate status', iceCand);
  if (iceCandidate) {
    pc.addCandidate(iceCandidate);
    if (!iceCand) {
      updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { preFetch: true } });
    } else if (!iceCand.sendStatus && iceCand.candidates && iceCand.candidates.length > 0) {
      // console.log('sending All ICe candidate to remote of iceCandidate arrive', iceCand);
      iceCand.candidates.forEach((e) => {
        apis.addIceCandidate(
          {
            iceCandidateDetail: {
              iceCandidate: JSON.stringify(e.candidate),
              uid: account.user.id,
              broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
              broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
            },
            userList: [{ userId: uid }],
          }
        );
      });
      updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true } });
    }
  }
};
