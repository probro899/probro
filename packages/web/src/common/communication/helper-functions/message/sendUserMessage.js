
export default async function sendUserMessage(props) {
  const {
    account,
    apis,
    webRtc,
    message,
  } = props;

  try {
    const sendingUserMessageRes = await apis.addUserMessage({
      tuserId: webRtc.showCommunication,
      fuserId: account.user.id,
      timeStamp: Date.now(),
      message,
      url: null,
      readStatus: 0,
      connectionId: webRtc.connectionId,
      broadCastId: `UserConnection-${account.user.id}`,
      broadCastUserList: [{ userId: webRtc.showCommunication }],
    });
    console.log('Sending user message res', sendingUserMessageRes);
    return sendingUserMessageRes;
  } catch (e) {
    return false;
    console.error('Error in sending message', e);
  }
}
