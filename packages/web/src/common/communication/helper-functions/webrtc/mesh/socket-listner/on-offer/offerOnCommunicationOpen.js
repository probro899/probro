import store from '../../../../../../../store';
import main from '../../../../../../../webrtc/mesh/main';
import onIceCandidateHandler from '../../onIceCandidateHandler';
import gotRemoteStreamHandler from '../../gotRemoteStreamHandler';
import iceCandidateStatusHandler from '../../iceCandidateStatusHandler';
import offerHandler from '../../offerHandler';
import localStreamHandler from '../../onLocalStream';
import iceGaterCompleteHandler from '../../onIceGatherCompleteHandler';

const onNotLiveHandler = async (updateWebRtc, broadCastId, database, type, webRtc, connectionId) => {
  // console.log('Communication is not live', database);
  await updateWebRtc('communicationContainer', 'list');
  await updateWebRtc('showCommunication', broadCastId);
  await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, chatHistory: { connectionId, type, user: { user: database.User.byId[broadCastId] }, broadCastId } });
  updateWebRtc('showIncommingCall', true);
};

const onLiveHandler = async (props, state, data) => {

  const { uid, offer } = data;
  const { updateWebRtc, database } = props;
  const { webRtc, account } = store.getState();
  const { apis } = state;
  try {
    const isPcCreated = webRtc.peerConnections[data.uid];
    let answer = null;
    let isConnected = false;
    if (isPcCreated) {
      const { pc, iceCandidateStatus } = webRtc.peerConnections[data.uid];
      if (iceCandidateStatus === 'connected') {
        // console.log(`${uid}) ANSER IN CONNECTED SATATE`, data);
        answer = await pc.createAnswer(offer, null);
        isConnected = true;
      } else {
        // console.log(`${uid}) ANSER IN NOT CONNECTED SATATE`, data);
        await pc.pc.close();
        delete webRtc.peerConnections[uid];
        const newPc = await main(
          onIceCandidateHandler(props, state),
          uid,
          gotRemoteStreamHandler(props),
          iceCandidateStatusHandler(props, state),
          offerHandler(props, state),
          localStreamHandler(props),
          iceGaterCompleteHandler(props, state)
        );
        answer = await newPc.createAnswer(offer, webRtc.connectedUsers[account.user.id].streams[0]);
        await updateWebRtc('peerConnections', { ...webRtc.peerConnections, [uid]: { pc: newPc, user: database.User.byId[uid] } });
        delete webRtc.iceCandidates[uid];
      }
    } else {
      // console.log(`${uid})CREATING NEW PC`);
      const newPc = await main(
        onIceCandidateHandler(props, state),
        uid,
        gotRemoteStreamHandler(props),
        iceCandidateStatusHandler(props, state),
        offerHandler(props, state),
        localStreamHandler(props),
        iceGaterCompleteHandler(props, state)
      );
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
        isConnected,
      },
      userList: [{ userId: uid }],
    });
  } catch (e) {
    console.error('erro in onlive offer handler', e);
  }
};

export default async (props, state, data) => {
  // console.log('Offer on Live handler called', data);
  const { database } = store.getState();
  const { updateWebRtc } = props;
  const { broadCastId, broadCastType, connectionId, uid } = data;
  const type = broadCastType === 'UserConnection' ? 'user' : 'board';
  const { webRtc } = store.getState();
  updateWebRtc('currentOffer', data);
  updateWebRtc('pendingOffers', { ...webRtc.pendingOffers, [uid]: data });

  if (!webRtc.isLive) {
    await onNotLiveHandler(updateWebRtc, broadCastId, database, type, webRtc, connectionId);
  } else {
    await onLiveHandler(props, state, data);
  }
};
