import createPcForEachUser from './createPcForEachUser';
import store from '../../../../../store';

export default (props, state) => async (apis, stream) => {
  console.log('answer handler called', stream);
  try {
    let { webRtc } = store.getState();
    const { account, updateWebRtc } = props;
    const { boardId } = webRtc.currentOffer;
    updateWebRtc('liveIncomingCall', false);
    await createPcForEachUser(boardId, props, state);
    // eslint-disable-next-line
    webRtc = store.getState().webRtc;
    updateWebRtc('outGoingCallType', stream);
    updateWebRtc('showIncommingCall', false);
    updateWebRtc('showCommunication', boardId);
    updateWebRtc('communicationContainer', 'connecting');
    updateWebRtc('showOutgoingCall', true);
    const previousOffers = webRtc.pendingOffers;
    //  console.log('pending offers', previousOffers);
    const pcs = Object.values(webRtc.peerConnections);
    //  console.log('all pcs in store', pcs);
    const remainingUserPcs = pcs.filter(p => previousOffers.find(ofr => ofr.uid === p.user.id));
    //  console.log('remainingUserPcs', remainingUserPcs);
    const answerPromises = remainingUserPcs.map(p => p.pc.createAnswer(previousOffers.find(ofr => ofr.uid === p.user.id).offer, stream));
    const anserList = await Promise.all(answerPromises);
    console.log('answer list', anserList);
    anserList.forEach((answer, idx) => apis.createAnswer({ answerDetail: { answer, uid: account.user.id, boardId }, userList: [{ userId: remainingUserPcs[idx].user.id }] }));
    const previousOffer = webRtc.pendingOffers;
    //  console.log('previousOffer for offer test', previousOffer);
    const pc = Object.values(webRtc.peerConnections);
    //  console.log('pc in offer test', pc);
    const remainingUser = pc.filter(p => !previousOffer.find(ofr => ofr.uid === p.user.id));
    //  console.log('remaininguser for offer test', remainingUser);
    const pcsPromises = remainingUser.map(p => p.pc.createOffer(stream));
    const allOffers = await Promise.all(pcsPromises);
    //  console.log('all offers', allOffers);
    // allOffers.forEach((offr, idx) => apis.createOffer({ offerDetail: { offer: offr, uid: account.user.id, boardId: 1 }, userList: [{ userId: remainingUser[idx].user.id }] }));
  } catch (e) {
    console.error('error in create answer', e);
  }
};
