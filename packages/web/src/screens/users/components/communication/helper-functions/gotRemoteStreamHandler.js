export default props => (stream, userId) => {
  // console.log('remote sream handler', stream, userId);
  const { updateWebRtc } = props;
  updateWebRtc('isLive', true);
};
