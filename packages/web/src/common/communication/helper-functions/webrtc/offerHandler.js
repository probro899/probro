import store from '../../../../store';

export default (props, state) => async (offer, userId) => {
  const { account, webRtc } = store.getState();
  const { updateWebRtc } = props;
  console.log('offer handler called', offer, userId, webRtc);
  updateWebRtc('streams', { ...webRtc.streams, [userId]: { ...webRtc.streams[userId], callEnd: false } });
  const broadCastType = webRtc.chatHistory.type === 'user' ? 'UserConnection' : 'Board';
  const broadCastId = webRtc.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication;
  const { apis } = state;
  apis.createOffer({ offerDetail: { offer, uid: account.user.id, broadCastId, broadCastType, connectionId: webRtc.connectionId, callType: webRtc.localStream.mediaType }, userList: [{ userId }] });
};
