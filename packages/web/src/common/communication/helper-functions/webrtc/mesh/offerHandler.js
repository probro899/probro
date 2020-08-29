import store from '../../../../../store';

export default (props, state) => async (offer, userId) => {
  try {
    const { account, webRtc } = store.getState();
    const { updateWebRtc } = props;
    // console.log('offer handler called', offer, userId, webRtc);
    // updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { streams: [] } });
    updateWebRtc('streams', { ...webRtc.streams, [userId]: { ...webRtc.streams[userId], callEnd: false, stream: [] } });
    // updateWebRtc('peerConnections', {...webRtc.peerConnections, [userId]: { ...webRtc.peerConnections[userId], offer, type: 'offer' } });
    const broadCastType = webRtc.localCallHistory.chatHistory.type === 'user' ? 'UserConnection' : 'Board';
    const broadCastId = webRtc.localCallHistory.chatHistory.type === 'user' ? account.user.id : webRtc.localCallHistory.chatHistory.connectionId;
    const { apis } = state;
    apis.createOffer({ offerDetail: { isLive: webRtc.isCallUpgraded, offer, uid: account.user.id, broadCastId, broadCastType, connectionId: webRtc.localCallHistory.chatHistory.connectionId, callType: webRtc.localCallHistory.mediaType }, userList: [{ userId }] });
  } catch (e) {
    console.error('Error in offerHandler', userId);
  }
};
