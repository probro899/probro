import store from '../../../../../../../store';

export default async (props, state, data) => {
  // console.log(`${data.uid}) OFFER INIT`, data);
  try {
    const { updateWebRtc } = props;
    const { connectionId, isLive } = data;
    const { webRtc } = store.getState();
    if (!webRtc.mainStreamId || isLive) {
      await updateWebRtc('mainStreamId', data.uid);
    }
    await updateWebRtc('connectionId', connectionId);
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [data.uid]: { streams: [], type: data.callType } });
    await updateWebRtc('streams', { ...webRtc.streams, [data.uid]: { ...webRtc.streams[data.uid], callEnd: false, stream: [], callType: 'Incoming' } });
    await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callType: webRtc.localCallHistory.callType || 'Incoming', callEnd: false });
  } catch (e) {
    console.error('Offer initialization Error', e);
  }
};
