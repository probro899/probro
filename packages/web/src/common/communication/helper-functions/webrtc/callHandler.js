import store from '../../../../store';
import createPcForEachUser from './createPcForEachUser';

export default (props, state) => async (apis, stream) => {
  console.log('call handler called', stream);
  let { webRtc } = store.getState();
  const { updateWebRtc, account } = props;
  if (!webRtc.isLive) {
    console.log('creating pc for users');
    await createPcForEachUser(webRtc.showCommunication, props, state);
  }
  // eslint-disable-next-line
  webRtc = store.getState().webRtc;
  console.log('webRtc value after creating pc', webRtc);
  updateWebRtc('communicationContainer', 'connecting');
  updateWebRtc('showOutgoingCall', true);
  const pcs = Object.values(webRtc.peerConnections);
  const users = Object.keys(webRtc.peerConnections);
  const pcsPromises = pcs.map(pc => pc.pc.createOffer(stream));
  await Promise.all(pcsPromises);
  // allOffers.forEach((offer, idx) => apis.createOffer({ offerDetail: { offer, uid: account.user.id, boardId: webRtc.showCommunication }, userList: [{ userId: parseInt(users[idx], 10) }] }));
};
