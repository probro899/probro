/* eslint-disable no-lonely-if */
export default async (props) => {
  // console.log('fetch chat history called', props);
  const { webRtc, updateWebRtc } = props;
  const { apis } = webRtc;
  const { fetchedApisRes } = webRtc;
  const { connectionId, type } = webRtc.chatHistory;
  const isFetchMessage = fetchedApisRes.find(fr => fr.connectionId === connectionId && fr.type === type);
  if (!isFetchMessage) {
    const getChatHistoryRes = await apis.getChatHistory({ type, connectionId, noOfMessage: 0 });
    if (getChatHistoryRes.status === 200) {
      updateWebRtc('fetchedApisRes', [...fetchedApisRes, getChatHistoryRes]);
    }
  } else {
    if (isFetchMessage.totalMessage > isFetchMessage.noOfMessage) {
      const getChatHistoryRes = await apis.getChatHistory({ type, connectionId, noOfMessage: isFetchMessage.noOfMessage });
      if (getChatHistoryRes.status === 200) {
        updateWebRtc('fetchedApisRes', fetchedApisRes.map(fr => (fr.connectionId === getChatHistoryRes.connectionId ? { ...fr, noOfMessage: getChatHistoryRes.noOfMessage } : fr)));
      }
    }
  }
};
