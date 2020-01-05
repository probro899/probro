import store from '../../../../../store';

export default (props, state, data) => {
  console.log('update call status called', data);
  const { uid, type } = data;
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  updateWebRtc('peerConnections', { ...webRtc.peerConnections, [uid]: { ...webRtc.peerConnections[uid], iceCandidateStatus: type } });
};
