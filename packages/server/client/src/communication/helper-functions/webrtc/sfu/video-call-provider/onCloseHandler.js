/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';

export default props => async (data) => {
  try {
    const { webRtc } = store.getState();
    const { updateWebRtc } = props;
    if (webRtc.isLive) {
      await updateWebRtc('chatHistory', webRtc.localCallHistory.chatHistory);
      if (webRtc.localCallHistory.stream) {
        if (webRtc.localCallHistory.stream.active) {
          const allTracks = webRtc.localCallHistory.stream.getTracks();
          allTracks.forEach(track => track.stop());
        }
      }
    }

    await updateWebRtc('communicationContainer', 'history');
    await updateWebRtc('outGoingCallType', null);
    await updateWebRtc('showOutgoingCall', false);
    await updateWebRtc('peerConnections', {});
    await updateWebRtc('pendingOffers', {});
    await updateWebRtc('remoteStream', {});
    await updateWebRtc('currentOffer', null);
    await updateWebRtc('iceCandidates', {});
    await updateWebRtc('liveIncomingCall', false);
    await updateWebRtc('isLive', false);
    await updateWebRtc('localCallHistory', { callEnd: true });
    await updateWebRtc('mainStreamId', null);
    await updateWebRtc('streams', {});
    await updateWebRtc('connectedUsers', {});
    await updateWebRtc('isConnecting', false);
    await updateWebRtc('showIncommingCall', false);
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 147 });
  }
};
