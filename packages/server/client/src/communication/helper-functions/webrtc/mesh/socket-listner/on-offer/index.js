import offerInitialization from './offerInitializationHandler';
import offerOnCommunicationOpen from './offerOnCommunicationOpen';
import offerOnCommunicationNotOpen from './offerOnCommunicationNotOpen';
import store from '../../../../../../store';
import autoCloseHandler from '../../autoCloseHandler';

const initCall = async (props, state, data, webRtc) => {
  // console.log('call init', data);
  await offerInitialization(props, state, data);
  if (webRtc.showCommunication) {
    await offerOnCommunicationOpen(props, state, data);
  } else {
    await offerOnCommunicationNotOpen(props, state, data);
  }
};
 
const declineCall = async (status, props, state, data, webRtc) => {
  // console.log('call decline', status, state, props, state, data, webRtc);
  const { account } = props;
  const { uid, broadCastId, broadCastType, connectionId } = data;
  const { apis } = state;
  try {
    apis.callStatusChange({
      callStatusDetails: {
        broadCastType,
        broadCastId,
        uid: account.user.id,
        connectionId,
        type: 'busy',
      },
      userList: [{ userId: uid }],
    });
  } catch (e) {
    console.error('Call Stautus change error when live', e);
  }
};

export default async (props, state, data) => {
  const { webRtc } = store.getState();
  // console.log(`${data.uid}) OFFER ARRIVED`, data);

  const { uid, connectionId, broadCastType, broadCastId } = data;
  const type = broadCastType === 'Board' ? 'board' : 'user';
  const { account, updateWebRtc } = props;
  // const { uid, broadCastId, broadCastType, connectionId } = data;
  const { apis } = state;
  if (webRtc.showIncommingCall || webRtc.isConnecting) {
    // console.log('inside call is budy mode', broadCastId);
    if (webRtc.localCallHistory.chatHistory.connectionId === broadCastId) {
      await updateWebRtc('pendingOffers', { ...webRtc.pendingOffers, [uid]: data });
      await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [data.uid]: { streams: [], type: data.callType } });
      await updateWebRtc('streams', { ...webRtc.streams, [data.uid]: { ...webRtc.streams[data.uid], callEnd: false, stream: [], callType: 'Incoming' } });
      // await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callType: webRtc.localCallHistory.callType || 'Incoming', callEnd: false });
    }
    declineCall('Call is busy', props, state, data, webRtc);
  } else {
    if (!webRtc.isLive) {
      autoCloseHandler(props, state);
      apis.callStatusChange({
        callStatusDetails: {
          broadCastType,
          broadCastId,
          uid: account.user.id,
          connectionId,
          type: 'ringing',
        },
        userList: [{ userId: uid }],
      });
    }

    if (type === 'board') {
      if (webRtc.isLive) {
        if (webRtc.localCallHistory.chatHistory.connectionId === broadCastId) {
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
        if (webRtc.localCallHistory.chatHistory.connectionId === connectionId && webRtc.localCallHistory.chatHistory.type !== 'board') {
          await initCall(props, state, data, webRtc);
        } else {
          declineCall('Call is busy', props, state, data, webRtc);
        }
      } else {
        await initCall(props, state, data, webRtc);
      }
    }
  }
};
