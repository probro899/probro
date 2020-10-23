import offerInitialization from './offerInitializationHandler';
import offerOnCommunicationOpen from './offerOnCommunicationOpen';
import offerOnCommunicationNotOpen from './offerOnCommunicationNotOpen';
import store from '../../../../../../store';
import autoCloseHandler from '../../autoCloseHandler';
import exceptionHandler from '../../conference-call-provider/exceptionHandler';

const initCall = async (props, state, data, webRtc) => {
  // console.log('call init', data);
  await offerInitialization(props, state, data);
  if (webRtc.showCommunication) {
    await offerOnCommunicationOpen(props, state, data);
  } else {
    await offerOnCommunicationNotOpen(props, state, data);
  }
};

const declineCall = async () => {
};

export default async (props, state, data) => {
  try {
    const { webRtc, account } = store.getState();
    const { boardId, userId } = data;
    const { apis } = webRtc;
    if (webRtc.showIncommingCall || webRtc.isConnecting) {
      declineCall('Call is busy', props, state, data, webRtc);
    } else if (webRtc.isLive) {
      if (webRtc.localCallHistory.chatHistory.connectionId === boardId) {
        await initCall(props, state, data, webRtc);
      } else {
        declineCall('Call is busy', props, state, data, webRtc);
      }
    } else {
      await initCall(props, state, data, webRtc);
      autoCloseHandler(props, state);
      apis.sfuCallStatusChange({
        callStatusDetails: {
          broadCastType: 'Board',
          broadCastId: boardId,
          uid: account.user.id,
          connectionId: boardId,
          type: 'ringing',
        },
        userList: [{ userId }],
      });
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 125 });
  }
};
