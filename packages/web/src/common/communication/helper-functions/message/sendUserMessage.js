
export default async function sendUserMessage(props) {
  const {
    account,
    apis,
    webRtc,
    message,
  } = props;
//  console.log('webRtc value in send User Message', webRtc);
  try {
    const sendingUserMessageRes = await apis.addUserMessage({
      tuserId: webRtc.chatHistory.user.user.id,
      fuserId: account.user.id,
      timeStamp: Date.now(),
      message,
      url: null,
      readStatus: 0,
      connectionId: webRtc.chatHistory.connectionId,
      broadCastId: `UserConnection-${account.user.id}`,
      broadCastUserList: [{ userId: webRtc.chatHistory.user.user.id }],
    });
    // console.log('Sending user message res', sendingUserMessageRes);
    return sendingUserMessageRes;
  } catch (e) {
    console.error('Error in sending message', e);
    return false;
  }
}
