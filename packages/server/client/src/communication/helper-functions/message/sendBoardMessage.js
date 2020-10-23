
export default async function sendBoardMessage(props) {
  const {
    account,
    webRtc,
    message,
  } = props;
  const { apis } = webRtc;
  try {
    const sendingRes = await apis.addBoardMessage({
      boardId: webRtc.chatHistory.connectionId,
      message,
      userId: account.user.id,
      timeStamp: Date.now(),
      url: null,
      remarks: null,
      broadCastId: `Board-${webRtc.chatHistory.connectionId}`,
      readStatus: 0,
    });
    // console.log('BoardMessage SendingMessage', sendingRes);
    return sendingRes;
  } catch (e) {
    console.error('Error in sending board message', e);
    return false;
  }
}
