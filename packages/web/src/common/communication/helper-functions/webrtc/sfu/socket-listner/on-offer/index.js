import offerInitialization from './offerInitializationHandler';
import offerOnCommunicationOpen from './offerOnCommunicationOpen';
import offerOnCommunicationNotOpen from './offerOnCommunicationNotOpen';
import store from '../../../../../../../store';
import autoCloseHandler from '../../autoCloseHandler';

const initCall = async (props, state, data, webRtc) => {
  console.log('call init', data);
  await offerInitialization(props, state, data);
  if (webRtc.showCommunication) {
    await offerOnCommunicationOpen(props, state, data);
  } else {
    await offerOnCommunicationNotOpen(props, state, data);
  }
};

const declineCall = async (status, props, state, data, webRtc) => {
  try {
    console.log('call decline', status, state, props, state, data, webRtc);
  } catch (e) {
    console.error('Call Stautus change error when live', e);
  }
};

export default async (props, state, data) => {
  const { webRtc, account } = store.getState();
  console.log(`SFU INIT CALLED`, data);
  const { boardId, userId } = data;
  const { apis } = state;

  if (webRtc.showIncommingCall || webRtc.isConnecting) {
    console.log('inside call is budy mode', boardId);
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
};
