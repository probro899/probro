
export default (props, state) => {
  const { apis, webRtc, account, addDatabaseSchema } = props;
  const { unSeenNo, lastMessageId } = state;
  if (unSeenNo > 0) {
    if (webRtc.chatHistory.type === 'user') {
      apis.addUserMessageSeenStatus({ userId: account.user.id, umId: lastMessageId, timeStamp: Date.now(), status: true, broadCastId: `UserConnection-${account.user.id}`, broadCastUserList: [{ userId: webRtc.chatHistory.user.user.id }] });
      addDatabaseSchema('UserMessageSeenStatus', { id: Date.now(), userId: account.user.id, umId: lastMessageId, timeStamp: Date.now(), status: true });
    }
    if (webRtc.chatHistory.type === 'board') {
      apis.addBoardMessageSeenStatus({ userId: account.user.id, bmId: lastMessageId, timeStamp: Date.now(), status: true, broadCastId: `Board-${webRtc.showCommunication}` });
      addDatabaseSchema('BoardMessageSeenStatus', { id: Date.now(), userId: account.user.id, bmId: lastMessageId, timeStamp: Date.now(), status: true });
    }
  }
}