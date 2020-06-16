import store from '../../../../../../../store';

export default async (props, state, data) => {
  // console.log(`${data.boardId}) OFFER INIT`, data);
  try {
    const { updateWebRtc } = props;
    const { boardId, userId } = data;
    const { webRtc } = store.getState();
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { streams: [] } });
    await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callType: webRtc.localCallHistory.callType || 'Incoming' });
  } catch (e) {
    console.error('Offer initialization Error', e);
  }
};
