import offerInitialization from './offerInitializationHandler';
import offerOnCommunicationOpen from './offerOnCommunicationOpen';
import offerOnCommunicationNotOpen from './offerOnCommunicationNotOpen';
import store from '../../../../../../store';

const initCall = async (props, state, data, webRtc) => {
  await offerInitialization(props, state, data);
  if (webRtc.showCommunication) {
    await offerOnCommunicationOpen(props, state, data);
  } else {
    await offerOnCommunicationNotOpen(props, state, data);
  }
};

const declineCall = async (status, props, state, data, webRtc) => {
  console.log('call decline', status, state, props, state, data, webRtc);
};

export default async (props, state, data) => {
  const { webRtc } = store.getState();
  const { uid, connectionId, broadCastType, broadCastId } = data;
  const type = broadCastType === 'Board' ? 'board' : 'user';

  if (type === 'board') {
    if (webRtc.isLive) {
      if (webRtc.showCommunication === broadCastId) {
        await initCall(props, state, data, webRtc);
      } else {
        declineCall('Call is busy', props, state, data, webRtc);
      }
    } else {
      await initCall(props, state, data, webRtc);
    }
  }

  if (type === 'user') {
    if (webRtc.isLive) {
      if (webRtc.connectionId === connectionId) {
        await initCall(props, state, data, webRtc);
      } else {
        declineCall('Call is busy', props, state, data, webRtc);
      }
    } else {
      await initCall(props, state, data, webRtc);
    }
  }
};
