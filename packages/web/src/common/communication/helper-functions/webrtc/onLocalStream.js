import store from '../../../../store';

export default props => (stream, userId) => {
  console.log('local stream handler', stream, userId);
  const { updateWebRtc } = props;
  updateWebRtc('streams', { ...store.getState().webRtc.streams, [userId]: stream });
};
