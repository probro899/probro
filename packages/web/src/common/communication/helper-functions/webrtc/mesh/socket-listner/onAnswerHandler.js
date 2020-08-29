import store from '../../../../../../store';

export default async (props, state, data) => {
  try {
    // console.log(`${data.uid}) ANSWER ARRIVE`, data);
    const { apis } = state;
    const { updateWebRtc } = props;
    const { webRtc, account, database } = store.getState();
    const { uid, answer, boardId, callType } = data;
    const { pc } = webRtc.peerConnections[uid];

    // Getting current IceCandidates
    const iceCandidate = webRtc.iceCandidates[uid];
    if (answer) {

      // Setting the remote answer to the related pc
      pc.setRemoteDescription(answer);

      // Checking and sending the iceCandidates
      if (iceCandidate.isGatherComplete) {

        // Converting all Candidates into string
        const finalIceCandidates = iceCandidate.candidates.map(e => JSON.stringify(e.candidate));

        // Sending to the related user
        apis.addIceCandidate(
          {
            iceCandidateDetail: {
              iceCandidate: finalIceCandidates,
              uid: account.user.id,
              broadCastId: webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
              broadCastType: webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
            },
            userList: [{ userId: uid }],
          }
        );

        // Setting sendStatus true for gather icecandidate complete state
        await updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true, doSend: false } });
      } else {
        await updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: false, doSend: true } });
      }

      if (!data.isConnected) {
        await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [uid]: { streams: [], type: callType } });
      }

      await updateWebRtc('isLive', true);
      await updateWebRtc('isConnecting', false);
    }
  } catch (e) {
    console.error('Error on onAnswer', data.uid, e);
  }
};
