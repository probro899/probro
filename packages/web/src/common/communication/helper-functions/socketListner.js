import client from '../../../socket';
import store from '../../../store';

export default (props, state) => {
  // Handle offer request
  client.on('offer', async (data) => {
    console.log('Offer arrived', data);
    const { updateWebRtc } = props;
    const { webRtc, account } = store.getState();
    const { apis } = state;
    if (webRtc.showCommunication) {
      updateWebRtc('currentOffer', data);
      updateWebRtc('pendingOffers', [...webRtc.pendingOffers, data]);
      if (webRtc.isLive) {
        try {
          const { uid, offer, boardId } = data;
          const { pc, iceCandidateStatus } = webRtc.peerConnections[data.uid];
          let answer = null;
          if (iceCandidateStatus === 'connected') {
            answer = await pc.createAnswer(offer, null);
          } else {
            answer = await pc.createAnswer(offer, webRtc.outGoingCallType);
          }
          apis.createAnswer({ answerDetail: { answer, uid: account.user.id, boardId }, userList: [{ userId: uid }] });
        } catch (e) {
          console.error('erro in answerHandler', e);
        }
      } else {
        updateWebRtc('liveIncomingCall', true);
      }
    } else {
      updateWebRtc('showIncommingCall', true);
      updateWebRtc('currentOffer', data);
      updateWebRtc('pendingOffers', [...webRtc.pendingOffers, data]);
    }
  });

  // Handling incoming answer
  client.on('answer', async (data) => {
    console.log('answer arrived', data);
    const { apis } = state;
    const { updateWebRtc } = props;
    const { webRtc, account } = store.getState();
    const { uid, answer, boardId } = data;
    const { pc } = webRtc.peerConnections[uid];
    const iceCandidate = webRtc.iceCandidates[uid];
    if (data) {
      pc.setRemoteDescription(answer);
      await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(iceCandidate.e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId: uid }] });
      updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true } });
    }
  });

  // Handling incoming iceCandidate
  client.on('icecandidate', async (data) => {
    console.log('icecandidate Arrived', data);
    const { apis } = state;
    const { uid, iceCandidate } = data;
    const { updateWebRtc } = props;
    const { webRtc, account } = store.getState();
    const { pc } = webRtc.peerConnections[uid];
    const iceCand = webRtc.iceCandidates[uid];
    if (iceCandidate) {
      pc.addCandidate(iceCandidate);
      if (!iceCand) {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { preFetch: true } });
      } else if (!iceCand.sendStatus) {
        await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(iceCand.e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId: uid }] });
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true } });
      }
    }
  });
};
