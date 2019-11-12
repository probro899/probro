
export default async function sendBoardMessage(props) {
  const {
    account,
    apis,
    webRtc,
    message,
  } = props;
  try {
    const sendingRes = await apis.addBoardMessage({
      boardId: webRtc.showCommunication,
      message,
      userId: account.user.id,
      timeStamp: Date.now(),
      url: null,
      remarks: null,
      broadCastId: `Board-${webRtc.showCommunication}`,
      readStatus: 0,
    });
    console.log('BoardMessage SendingMessage', sendingRes);
    return sendingRes;
  } catch (e) {
    console.error('Error in sending board message', e);
    return false;
  }
}
