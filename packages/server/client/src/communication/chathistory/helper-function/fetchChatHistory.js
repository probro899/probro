export default async (props) => {
  const { apis, webRtc, updateWebRtc } = props;
  const { fetchedApisRes } = webRtc;
  const { connectionId, type } = webRtc.chatHistory;
  let isFetchMessage;
  if (type === 'user') {
    isFetchMessage = fetchedApisRes.find(fr => fr.connectionId === connectionId && fr.type === type);
    if (!isFetchMessage) {
      const getChatHistoryRes = await apis.getChatHistory({ type, connectionId });
      if (getChatHistoryRes.status === 200) {
        updateWebRtc('fetchedApisRes', [...fetchedApisRes, getChatHistoryRes]);
      }
    }
  }

  if (type === 'board') {
    isFetchMessage = fetchedApisRes.find(fr => fr.connectionId === connectionId && fr.type === type);
    if (!isFetchMessage) {
      const getChatHistoryRes = await apis.getChatHistory({ type, connectionId });
      if (getChatHistoryRes.status === 200) {
        updateWebRtc('fetchedApisRes', [...fetchedApisRes, getChatHistoryRes]);
      }
    }
  }
};
