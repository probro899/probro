
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
      const connection = database.UserConnection.byId[webRtc.chatHistory.connectionId];
      const isDeleted = connection.status !== 'deleted';
      showAudio = janus.oneToOneCall && isDeleted;
      showVideo = janus.oneToOneCall && isDeleted;
    }
  }
  return { showVideo, showAudio, showJoin };
};
