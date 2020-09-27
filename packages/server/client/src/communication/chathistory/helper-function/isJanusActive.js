
export default (props) => {
  // const { webRtc, database } = store.getState(); // before
  const { webRtc, database } = props;
  const { janus } = webRtc;
  let showAudio = false;
  let showVideo = false;
  let showJoin = false;

  if (janus) {
    if (webRtc.chatHistory.type === 'board') {
      showAudio = !database.Board.byId[webRtc.chatHistory.connectionId].activeStatus;
      showVideo = !database.Board.byId[webRtc.chatHistory.connectionId].activeStatus;
      showJoin = database.Board.byId[webRtc.chatHistory.connectionId].activeStatus;
    } else {
      showAudio = janus.oneToOneCall;
      showVideo = janus.oneToOneCall;
    }
  }
  return { showVideo, showAudio, showJoin };
};
