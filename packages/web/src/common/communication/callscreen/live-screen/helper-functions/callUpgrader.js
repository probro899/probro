import mediaSelector from '../../../mediaSelector';

export default async (mediaType, props) => {
  const { _callHandler, apis, updateWebRtc, webRtc, account, updateDatabaseSchema } = props;
  const stream = await mediaSelector(mediaType);
  updateWebRtc('isCallUpgraded', true);
  if (webRtc.localCallHistory.stream) {
    if (webRtc.localCallHistory.stream.active) {
      // console.log('inside the local steam stop case');
      const allTracks = webRtc.localCallHistory.stream.getTracks();
      // console.log('all tracks', allTracks);
      allTracks.forEach(track => track.stop());
    }
  }
  // updateWebRtc('localStream', { ...webRtc.localStream, stream, mediaType });
  updateWebRtc('streams', { [account.user.id]: { stream: [stream] } });
  if (webRtc.chatHistory.type === 'user') {
    updateWebRtc('mainStreamId', webRtc.chatHistory.user.user.id);
    updateWebRtc('streams', { ...webRtc.streams, [webRtc.chatHistory.user.user.id]: { stream: [] } });
  }
  if (webRtc.chatHistory.type === 'board') {
    updateDatabaseSchema('Board', { id: webRtc.localCallHistory.chatHistory.connectionId, activeStatus: account.user.id });
  }
  updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, stream, mediaType, callEnd: false });

  // console.log('In mute Test before', stream.getTracks());
  // const changeStream = stream.getTracks()[0].enabled = false;
  // console.log('after mute', changeStream);

  _callHandler(apis, stream);
};
