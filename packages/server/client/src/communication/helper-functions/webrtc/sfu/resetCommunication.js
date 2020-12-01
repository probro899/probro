export default async (updateWebRtc) => {
  const todoRes = [
    updateWebRtc('communicationContainer', 'history'),
    updateWebRtc('screenShareNotAllowed', false),
    updateWebRtc('deviceNotAllowed', false),
    updateWebRtc('outGoingCallType', null),
    updateWebRtc('showOutgoingCall', false),
    updateWebRtc('peerConnections', {}),
    updateWebRtc('pendingOffers', {}),
    updateWebRtc('remoteStream', {}),
    updateWebRtc('currentOffer', null),
    updateWebRtc('iceCandidates', {}),
    updateWebRtc('liveIncomingCall', false),
    updateWebRtc('localCallHistory', { callEnd: true }),
    updateWebRtc('mainStreamId', null),
    updateWebRtc('streams', {}),
    updateWebRtc('connectedUsers', {}),
    updateWebRtc('isConnecting', false),
    updateWebRtc('isLive', false),
  ];

  const res = await Promise.all(todoRes);
  if (res) {
    return true;
  }
};
