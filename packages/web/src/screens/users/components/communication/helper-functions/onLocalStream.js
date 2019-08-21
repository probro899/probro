export default props => (stream, userId) => {
  console.log('local sream handler', stream, userId);
  const { updateWebRtc } = props;
  // updateWebRtc('isLive', true);
};
