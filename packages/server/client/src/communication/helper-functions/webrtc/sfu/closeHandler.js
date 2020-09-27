/* eslint-disable import/no-cycle */
/* eslint-disable no-lonely-if */
import store from '../../../../store';
import oneToOneCallCloseHandler from './oneToOneCallCloseHandler';
import conferenceCloseHandler from './confereceCloseHandler';

export default props => async (closeType) => {
  const { webRtc } = store.getState();
  // console.log('Call Close handler called', webRtc, closeType);
  const { updateWebRtc } = props;

  // store current chathistory to local chathistory
  updateWebRtc('chatHistory', webRtc.localCallHistory.chatHistory);

  // detach and close local using media
  if (webRtc.localCallHistory.stream) {
    if (webRtc.localCallHistory.stream.active) {
      const allTracks = webRtc.localCallHistory.stream.getTracks();
      allTracks.forEach(track => track.stop());
    }
  }

  if (webRtc.localCallHistory.chatHistory.type === 'user') {
    oneToOneCallCloseHandler(props, closeType);
  } else {
    conferenceCloseHandler(props);
  }

  // restoring stuff
  updateWebRtc('communicationContainer', 'history');
  updateWebRtc('outGoingCallType', null);
  updateWebRtc('showOutgoingCall', false);
  updateWebRtc('peerConnections', {});
  updateWebRtc('pendingOffers', {});
  updateWebRtc('remoteStream', {});
  updateWebRtc('currentOffer', null);
  updateWebRtc('iceCandidates', {});
  updateWebRtc('liveIncomingCall', false);
  updateWebRtc('isLive', false);
  updateWebRtc('localCallHistory', { callEnd: true });
  updateWebRtc('mainStreamId', null);
  updateWebRtc('streams', {});
  updateWebRtc('connectedUsers', {});
  updateWebRtc('isConnecting', false);
};
