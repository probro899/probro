import store from '../../../../../../store';

export default async (props, state, data) => {
  console.log('Offer Initialization', data);
  try {
    const { updateWebRtc } = props;
    const { connectionId, isLive } = data;
    const { webRtc } = store.getState();
    if (!webRtc.mainStreamId || isLive) {
      updateWebRtc('mainStreamId', data.uid);
    }
    updateWebRtc('connectionId', connectionId);

    updateWebRtc('streams', { ...webRtc.streams, [data.uid]: { ...webRtc.streams[data.uid], callEnd: false, stream: [], callType: 'Incoming' } });
    updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callType: webRtc.localCallHistory.callType || 'Incoming', callEnd: false });
  } catch (e) {
    console.error('Offer initialization Error', e);
  }
};
