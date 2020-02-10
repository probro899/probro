import store from '../../../../store';

export default (props, state) => async (offer, userId) => {
  const { account, webRtc } = store.getState();
  const { updateWebRtc } = props;
  // console.log('offer handler called', offer, userId, webRtc);
  updateWebRtc('streams', { ...webRtc.streams, [userId]: { ...webRtc.streams[userId], callEnd: false, stream: [] } });
  const broadCastType = webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board';
  const broadCastId = webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.showCommunication;
  const { apis } = state;
  apis.createOffer({ offerDetail: { isLive: webRtc.isCallUpgraded, offer, uid: account.user.id, broadCastId, broadCastType, connectionId: webRtc.localCallHistory.chatHistory.connectionId, callType: webRtc.localCallHistory.mediaType }, userList: [{ userId }] });
};
