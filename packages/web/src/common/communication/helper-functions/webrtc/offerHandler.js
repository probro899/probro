import store from '../../../../store';

export default (props, state) => async (offer, userId) => {
  const { account, webRtc } = store.getState();
  console.log('offer handler called', offer, userId, webRtc);
  const { apis } = state;
  apis.createOffer({ offerDetail: { offer, uid: account.user.id, boardId: webRtc.showCommunication }, userList: [{ userId }] });
};
