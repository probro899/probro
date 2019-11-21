import store from '../../../../store';

export default (props, state) => async (offer, userId) => {
  const { account, webRtc } = store.getState();
  console.log('offer handler called', offer, userId, webRtc);
  const broadCastType = webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board';
  const broadCastId = webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication;
  const { apis } = state;
  apis.createOffer({ offerDetail: { offer, uid: account.user.id, broadCastId, broadCastType, connectionId: webRtc.connectionId }, userList: [{ userId }] });
};
