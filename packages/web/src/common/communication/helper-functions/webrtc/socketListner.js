import client from '../../../../socket';
import store from '../../../../store';

export default (props, state) => {
  // Handle offer request
  console.log('webRtc socket listner called');
  client.on('offer', async (data) => {
    console.log('Offer arrived', data);
    const { updateWebRtc, database } = props;
    const { broadCastId, broadCastType, connectionId } = data;
    const type = broadCastType === 'UserConnection' ? 'user' : 'board';
    const { webRtc, account } = store.getState();
    const { apis } = state;
    if (webRtc.showCommunication) {
      if (!webRtc.isLive) {
        await updateWebRtc('communicationContainer', 'list');
        await updateWebRtc('showCommunication', broadCastId);
        await updateWebRtc('chatHistory', { type, user: { user: database.User.byId[broadCastId] }, broadCastId });
        updateWebRtc('showIncommingCall', true);
      }
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
          apis.createAnswer({
            answerDetail: {
              answer,
              uid: account.user.id,
              broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
              broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
            },
            userList: [{ userId: uid }],
          });
        } catch (e) {
          console.error('erro in answerHandler', e);
        }
      } else {
        updateWebRtc('liveIncomingCall', true);
      }
    } else {
      await updateWebRtc('chatHistory', { type, user: { user: database.User.byId[broadCastId] }, broadCastId });
      await updateWebRtc('showCommunication', broadCastId);
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
    console.log('Total candidateFor this pc', webRtc.iceCandidates);
    const { uid, answer, boardId } = data;
    const { pc } = webRtc.peerConnections[uid];
    const iceCandidate = webRtc.iceCandidates[uid];
    if (data) {
      console.log('sending All candidate during answer', iceCandidate);
      pc.setRemoteDescription(answer);
      iceCandidate.candidates.forEach((e) => {
        apis.addIceCandidate(
          {
            iceCandidateDetail: {
              iceCandidate: JSON.stringify(e.candidate),
              uid: account.user.id,
              broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
              broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
            },
            userList: [{ userId: uid }],
          });
      });
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
    console.log('local iceCandidate status', iceCand);
    if (iceCandidate) {
      pc.addCandidate(iceCandidate);
      if (!iceCand) {
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { preFetch: true } });
      } else if (!iceCand.sendStatus && iceCand.candidates && iceCand.candidates.length > 0) {
        console.log('sending All ICe candidate to remote of iceCandidate arrive', iceCand);
        iceCand.candidates.forEach((e) => {
          apis.addIceCandidate(
            {
              iceCandidateDetail: {
                iceCandidate: JSON.stringify(e.candidate),
                uid: account.user.id,
                broadCastId: webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
                broadCastType: webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
              },
              userList: [{ userId: uid }],
            }
          );
        });
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true } });
      }
    }
  });
};
