
export default async (mediaType, props) => {
  const { _callHandler, updateWebRtc, webRtc, account, updateDatabaseSchema } = props;

  // update webRtc
  await updateWebRtc('isCallUpgraded', true);

  if (webRtc.localCallHistory.stream) {
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { ...webRtc.connectedUsers[account.user.id], type: mediaType } });
    if (webRtc.localCallHistory.chatHistory.type === 'board' && mediaType !== 'mute' && mediaType !== 'unmute') {
      await updateDatabaseSchema('Board', { id: webRtc.localCallHistory.chatHistory.connectionId, activeStatus: account.user.id });
    }

    if (mediaType === 'mute' || mediaType === 'unmute') {
      await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callEnd: false, mute: mediaType === 'mute' });
    } else {
      await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, mediaType, callEnd: false });
    }
    _callHandler(mediaType);
  }
};
