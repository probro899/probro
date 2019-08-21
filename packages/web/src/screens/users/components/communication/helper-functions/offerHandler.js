import store from '../../../../../store';

export default (props, state) => async (offer, userId) => {
  console.log('offer handler called', offer, userId);
  const { account, webRtc } = store.getState();
  const { apis } = state;
  apis.createOffer({ offerDetail: { offer, uid: account.user.id, boardId: webRtc.showCommunication }, userList: [{ userId }] });
};
