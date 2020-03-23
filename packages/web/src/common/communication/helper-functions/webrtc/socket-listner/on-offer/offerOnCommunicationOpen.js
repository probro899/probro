import store from '../../../../../../store';
import main from '../../../../../../webrtc/main';
import onIceCandidateHandler from '../../onIceCandidateHandler';
import gotRemoteStreamHandler from '../../gotRemoteStreamHandler';
import iceCandidateStatusHandler from '../../iceCandidateStatusHandler';
import offerHandler from '../../offerHandler';
import localStreamHandler from '../../onLocalStream';

const onNotLiveHandler = async (updateWebRtc, broadCastId, database, type, webRtc, connectionId) => {
  console.log('Communication is not live', database);
  await updateWebRtc('communicationContainer', 'list');
  await updateWebRtc('showCommunication', broadCastId);
  await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, chatHistory: { connectionId, type, user: { user: database.User.byId[broadCastId] }, broadCastId } });
  updateWebRtc('showIncommingCall', true);
};

const onLiveHandler = async (props, state, data) => {
  // console.log('communication is live');
  const { uid, offer } = data;
  const { updateWebRtc, database } = props;
  const { webRtc, account } = store.getState();
  const { apis } = state;
  try {
    const { pc, iceCandidateStatus } = webRtc.peerConnections[data.uid];
    let answer = null;
    if (iceCandidateStatus === 'connected') {
      answer = await pc.createAnswer(offer, null);
    } else {
      pc.pc.close();
      delete webRtc.peerConnections[uid];
      const newPc = await main(onIceCandidateHandler(props, state), uid, gotRemoteStreamHandler(props), iceCandidateStatusHandler(props), offerHandler(props, state), localStreamHandler(props));
      answer = await newPc.createAnswer(offer, webRtc.streams[account.user.id].stream[0]);
      updateWebRtc('peerConnections', { ...webRtc.peerConnections, [uid]: { pc: newPc, user: database.User.byId[uid] } });
    }
    apis.createAnswer({
      answerDetail: {
        answer,
        uid: account.user.id,
        broadCastId: webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication,
        broadCastType: webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board',
        callType: webRtc.localCallHistory.mediaType,
      },
      userList: [{ userId: uid }],
    });
  } catch (e) {
    console.error('erro in onlive offer handler', e);
  }
};

export default async (props, state, data) => {
  // console.log('Offer on Live handler called');
  const { database } = store.getState();
  const { updateWebRtc } = props;
  const { broadCastId, broadCastType, connectionId } = data;
  const type = broadCastType === 'UserConnection' ? 'user' : 'board';
  const { webRtc } = store.getState();
  updateWebRtc('currentOffer', data);
  updateWebRtc('pendingOffers', [...webRtc.pendingOffers, data]);

  if (!webRtc.isLive) {
    await onNotLiveHandler(updateWebRtc, broadCastId, database, type, webRtc, connectionId);
  } else {
    await onLiveHandler(props, state, data);
  }
};
