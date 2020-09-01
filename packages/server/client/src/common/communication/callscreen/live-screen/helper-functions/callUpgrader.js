import mediaSelector from '../../../mediaSelector';
import store from '../../../../../store';

export default async (mediaType, props) => {
  const { _callHandler, apis, updateWebRtc, webRtc, account, updateDatabaseSchema } = props;
  const preMediaType = webRtc.localCallHistory.mediaType;
  // const finalMediaType = mediaType === 'mute' ? `${preMediaType}mute` : mediaType;
  // const stream = await mediaSelector(mediaType);
  // if (stream) {
  await updateWebRtc('isCallUpgraded', true);
  if (webRtc.localCallHistory.stream) {
    // if (webRtc.localCallHistory.stream.active || webRtc.localCallHistory.stream.enabled) {
    //   // console.log('inside the local steam stop case');
    //   const allTracks = webRtc.localCallHistory.stream.getTracks();
    //   // console.log('all tracks', allTracks);
    //   allTracks.forEach(track => track.stop());
    // }
    // }
    // updateWebRtc('localStream', { ...webRtc.localStream, stream, mediaType });
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { ...webRtc.connectedUsers[account.user.id], type: mediaType } });
    // await updateWebRtc('streams', { [account.user.id]: { stream: [stream] } });
    // if (webRtc.localCallHistory.chatHistory.type === 'user') {
    //   updateWebRtc('mainStreamId', webRtc.localCallHistory.chatHistory.user.user.id);
    //   // updateWebRtc('streams', { ...webRtc.streams, [webRtc.localCallHistory.chatHistory.user.user.id]: { stream: [] } });
    // }
    if (webRtc.localCallHistory.chatHistory.type === 'board') {
      updateDatabaseSchema('Board', { id: webRtc.localCallHistory.chatHistory.connectionId, activeStatus: account.user.id });
    }

    if (mediaType === 'mute' || mediaType === 'unmute') {
      updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callEnd: false, mute: mediaType === 'mute' });
    } else {
      updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, mediaType, callEnd: false });
    }
    _callHandler(apis, null, mediaType, preMediaType);
  }

  // console.log('Call upgraded', store.getState().webRtc.connectedUsers);
};
