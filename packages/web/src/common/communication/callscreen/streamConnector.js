
export default (streams, props) => {
  const { webRtc, account } = props;

  if (webRtc.localCallHistory.chatHistory.type === 'user') {
    const lastVideoElement = document.getElementById('video-mentor');
    // console.log('streams in stream connector', streams, lastVideoElement, webRtc);
    if (lastVideoElement) {
      streams[webRtc.mainStreamId].stream.forEach((stream) => {
        if (stream) {
          if (stream.streams) {
            lastVideoElement.srcObject = stream.streams[0];
          }
        }
      });
    }
  }

  if (webRtc.localCallHistory.chatHistory.type === 'board') {
    const userIds = Object.keys(streams);
    const lastVideoElement = document.getElementById('video-mentor');
    if (lastVideoElement) {
      streams[webRtc.mainStreamId].stream.forEach((stream) => {
        if (stream.streams) {
          lastVideoElement.srcObject = stream.streams[0];
        }
        if (webRtc.mainStreamId === account.user.id) {
          lastVideoElement.srcObject = stream;
        }
      });
    }
    const allVideoElements = userIds.map(uid => document.getElementById(`video-${uid}`));
    // console.log('all Video Elements', allVideoElements, userIds);
    allVideoElements.forEach((ve, idx) => {
      if (ve) {
        streams[userIds[idx]].stream.forEach((stream) => {
          if (stream.streams) {
            ve.srcObject = stream.streams[0];
          }
        });
      }
    });
  }
};
