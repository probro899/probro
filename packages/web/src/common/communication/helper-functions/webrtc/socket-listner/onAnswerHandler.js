import store from '../../../../../store';

export default async (props, state, data) => {
  // console.log('answer arrived', data);
  const { apis } = state;
  const { updateWebRtc } = props;
  const { webRtc, account, database } = store.getState();
  // console.log('Total candidateFor this pc', webRtc.iceCandidates);
  const { uid, answer, boardId } = data;
  const { pc } = webRtc.peerConnections[uid];
  console.log('ONANSWER', uid, webRtc);
  const iceCandidate = webRtc.iceCandidates[uid];
  if (data) {
    // console.log('sending All candidate during answer', iceCandidate);
    pc.setRemoteDescription(answer);
    iceCandidate.candidates.forEach((e) => {
      apis.addIceCandidate(
        {
          iceCandidateDetail: {
            iceCandidate: JSON.stringify(e.candidate),
            uid: account.user.id,
            broadCastId: webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
            broadCastType: webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
          },
          userList: [{ userId: uid }],
        });
    });
    updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true } });
    updateWebRtc('isLive', true);
    updateWebRtc('isConnecting', false);
  }
};
