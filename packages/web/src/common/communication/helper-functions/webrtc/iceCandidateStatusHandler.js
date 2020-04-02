import store from '../../../../store';

export default props => (e, state, userId) => {
  console.log(`${userId}) ICECANDIDATE STATUS`, state.iceConnectionState);
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  updateWebRtc('peerConnections', { ...webRtc.peerConnections, [userId]: { ...webRtc.peerConnections[userId], iceCandidateStatus: state.iceConnectionState } });
};
