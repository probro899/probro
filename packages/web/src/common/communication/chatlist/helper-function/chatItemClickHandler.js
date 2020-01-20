export default (chatHistory) => {
  const { change, updateWebRtc, database, apis, account, addDatabaseSchema, fromLive, showChatHistory  } = chatHistory.props;
  console.log('props in onClick chalt list', chatHistory);
  const { type, user, lastMessageId, boardDetails, unSeenNo } = chatHistory;
  const id = user ? user.user.id : chatHistory.boardDetails.id;
  updateWebRtc('chatHistory', chatHistory);
  if (!fromLive) {
    change('history');
  }

  if (fromLive) {
    showChatHistory(true);
  }

  if (chatHistory.type === 'user') {
    const connection = Object.values(database.UserConnection.byId).find(con => con.userId === id || con.mId === id);
    updateWebRtc('connectionId', connection.id);
  }
  updateWebRtc('peerType', type);
  updateWebRtc('showCommunication', id);
  if (unSeenNo > 0) {
    if (type === 'user') {
      apis.addUserMessageSeenStatus({ userId: account.user.id, umId: lastMessageId, timeStamp: Date.now(), status: true, broadCastId: `UserConnection-${account.user.id}`, broadCastUserList: [{ userId: user.user.id }] });
      addDatabaseSchema('UserMessageSeenStatus', { id: Date.now(), userId: account.user.id, umId: lastMessageId, timeStamp: Date.now(), status: true });
    }
    if (type === 'board') {
      apis.addBoardMessageSeenStatus({ userId: account.user.id, bmId: lastMessageId, timeStamp: Date.now(), status: true, broadCastId: `Board-${boardDetails.id}` });
      addDatabaseSchema('BoardMessageSeenStatus', { id: Date.now(), userId: account.user.id, bmId: lastMessageId, timeStamp: Date.now(), status: true });
    }
  }
};
