/* eslint-disable prefer-destructuring */
import createPcForEachUser from './createPcForEachUser';
import store from '../../../../store';

export default (props, state) => async (apis, stream) => {
  // console.log('answer handler called', stream);
  try {
    let { webRtc } = store.getState();
    const { account, updateWebRtc } = props;
    const { broadCastId, broadCastType, connectionId } = webRtc.currentOffer;
    updateWebRtc('liveIncomingCall', false);

    // Creating pc for users
    await createPcForEachUser(broadCastId, props, state);

    // geting all currently created webRtc Value need to test
    webRtc = store.getState().webRtc;

    // This is confusing store change need to remove
    updateWebRtc('streams', { [account.user.id]: { stream: [stream] } });

    // Set out going stream in store
    updateWebRtc('outGoingCallType', stream);

    // Set IncommingCall Screen do not show again in another offer
    updateWebRtc('showIncommingCall', false);

    // Set broadCast is id of board that identify current id of board or user
    updateWebRtc('showCommunication', broadCastId);

    // Setting connectiion id for identifing user connection id that is used in another incomming call rejection or other stuff
    updateWebRtc('connectionId', connectionId);

    // Switch the Screen in connecting mode
    updateWebRtc('communicationContainer', 'connecting');

    // Set switch the screen into outgoing screen
    updateWebRtc('showOutgoingCall', true);

    // Collecting all the offer arrived at this moment
    const previousOffers = Object.values(webRtc.pendingOffers);
    // console.log('pending Offers in anser handler', previousOffers);
    // Collecting all the pcs for offer and answer
    const pcs = Object.values(webRtc.peerConnections);

    // Finding the pc of current offers
    const pendingOfferUserPcs = pcs.filter(p => previousOffers.find(ofr => ofr.uid === p.user.id));

    // Creating the anser of all pending offers
    const answerPromises = pendingOfferUserPcs.map(p => p.pc.createAnswer(previousOffers.find(ofr => ofr.uid === p.user.id).offer, stream));
    const anserList = await Promise.all(answerPromises);

    // Sending the answer to the related offer user
    anserList.forEach((answer, idx) => apis.createAnswer(
      {
        answerDetail: {
          answer,
          uid: account.user.id,
          broadCastId,
          broadCastType,
          callType: webRtc.localCallHistory.mediaType,
        },
        userList: [{ userId: pendingOfferUserPcs[idx].user.id }],
      }
    ));

    // Finding all remaining pc that need to be offer
    const remainingUser = pcs.filter(p => !previousOffers.find(ofr => ofr.uid === p.user.id));

    // Creating offer to all Reaming users or pcs
    const pcsPromises = remainingUser.map(p => p.pc.createOffer(stream));
    await Promise.all(pcsPromises);

    // Set the communication in live mode
    updateWebRtc('isLive', true);

    //  Need to delete on cleaning time
    // allOffers.forEach((offr, idx) => apis.createOffer({ offerDetail: { offer: offr, uid: account.user.id, boardId: 1 }, userList: [{ userId: remainingUser[idx].user.id }] }));
  } catch (e) {
    console.error('error in create answer', e);
  }
};
