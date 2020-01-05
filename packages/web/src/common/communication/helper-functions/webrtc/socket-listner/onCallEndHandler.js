import closeHandler from '../closeHandler';
import store from '../../../../../store';

const closeCall = async (props, state, data) => {
  console.log('data in close handler', data);
  const { updateWebRtc } = props;
  await closeHandler(props, state, state.apis)(data);
  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'history');
};

const declineCloseCall = (state) => {
  console.log('close call decline', state);
};

export default async (props, state, data) => {
  const { webRtc } = store.getState();
  const { uid, broadCastId, broadCastType, type, connectionId } = data;
  if (type === webRtc.chatHistory.type && webRtc.isLive) {
    if (webRtc.connectionId === connectionId) {
      closeCall(props, state, data);
    } else {
      declineCloseCall('Permission denied');
    }
  }

  if (type === 'board') {
    if (webRtc.isLive && webRtc.showCommunication === broadCastId) {
      closeCall(props, state, data);
    } else {
      declineCloseCall('Permission denied to end call');
    }
  }
};
