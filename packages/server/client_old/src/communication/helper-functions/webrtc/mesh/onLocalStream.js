import store from '../../../../store';

export default props => (stream, userId) => {
  // console.log('local stream handler', stream, userId);
  const { updateWebRtc } = props;
  if (store.getState().webRtc.streams) {
    updateWebRtc('streams', { ...store.getState().webRtc.streams, [userId]: { stream: [] } });
  } else {
    updateWebRtc('streams', { [userId]: { stream: [] } });
  }
};
