import store from '../../../../store';

export default (props, mainStateApis) => (e, state, userId) => {
  console.log(`${userId}) ICECANDIDATE STATUS`, state.iceConnectionState, mainStateApis);
  const { updateWebRtc } = props;
  const { apis } = mainStateApis;

  const { webRtc, account } = store.getState();

  try {
    const boardId = webRtc.localCallHistory.chatHistory.connectionId;
    const uid = account.user.id;
    const pcId = userId;
    const status = state.iceConnectionState;
    console.log('Connection state', boardId, uid, pcId, status);
    apis.onPcStatusChange({
      boardId, userId: uid, pcId, status });
  } catch (e) {
    console.error('Faild to update onPcStatusChange', e);
  }

  updateWebRtc('connectedUsers', {
    ...webRtc.connectedUsers,
    [userId]: { ...webRtc.connectedUsers[userId], iceCandidateStatus: state.iceConnectionState },
  });

  updateWebRtc('peerConnections', {
    ...webRtc.peerConnections,
    [userId]: { ...webRtc.peerConnections[userId], iceCandidateStatus: state.iceConnectionState },
  });
};
