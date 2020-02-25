import closeHandler from '../closeHandler';
import store from '../../../../../store';

const closeCall = async (props, state, data) => {
  // console.log('data in close handler', data);
  const { updateWebRtc } = props;
  await closeHandler(props, state, state.apis)(data);
  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'history');
};

const declineCloseCall = (state) => {
  // console.log('close call decline', state);
};

export default async (props, state, data, maximizeHandler) => {
  // console.log('close details in main close handler', data);
  const { webRtc } = store.getState();
  const { uid, broadCastId, broadCastType, type, connectionId } = data;
  if (type === 'user') {
    if (webRtc.isLive || webRtc.peerConnections[uid] || webRtc.showIncommingCall) {
      if (type === webRtc.localCallHistory.chatHistory.type) {
        if (webRtc.localCallHistory.chatHistory.connectionId === connectionId) {
          maximizeHandler();
          closeCall(props, state, data);
        } else {
          declineCloseCall('Permission denied');
        }
      }
    }
  }

  if (type === 'board') {
    if (webRtc.isLive && webRtc.showCommunication === broadCastId) {
      maximizeHandler();
      closeCall(props, state, data);
    } else {
      declineCloseCall('Permission denied to end call');
    }
  }
};
