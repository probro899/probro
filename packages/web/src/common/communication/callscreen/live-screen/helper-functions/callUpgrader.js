import mediaSelector from '../../../mediaSelector';
import store from '../../../../../store';

export default async (mediaType, props) => {
  const { _callHandler, apis, updateWebRtc, webRtc, account, updateDatabaseSchema } = props;
  const stream = await mediaSelector(mediaType);
  if (stream) {
    await updateWebRtc('isCallUpgraded', true);
    if (webRtc.localCallHistory.stream) {
      if (webRtc.localCallHistory.stream.active) {
        // console.log('inside the local steam stop case');
        const allTracks = webRtc.localCallHistory.stream.getTracks();
        // console.log('all tracks', allTracks);
        allTracks.forEach(track => track.stop());
      }
    }
    // updateWebRtc('localStream', { ...webRtc.localStream, stream, mediaType });
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [account.user.id]: { streams: [stream], type: mediaType } });
    await updateWebRtc('streams', { [account.user.id]: { stream: [stream] } });
    if (webRtc.localCallHistory.chatHistory.type === 'user') {
      updateWebRtc('mainStreamId', webRtc.localCallHistory.chatHistory.user.user.id);
      updateWebRtc('streams', { ...webRtc.streams, [webRtc.chatHistory.user.user.id]: { stream: [] } });
    }
    if (webRtc.localCallHistory.chatHistory.type === 'board') {
      updateDatabaseSchema('Board', { id: webRtc.localCallHistory.chatHistory.connectionId, activeStatus: account.user.id });
    }
    updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, stream, mediaType, callEnd: false });
    _callHandler(apis, stream);
  }

  console.log('Call upgraded', store.getState().webRtc.connectedUsers);
};
