import store from '../../../../../../store';
import exceptionHandler from '../../conference-call-provider/exceptionHandler';

export default async (props, state, data) => {
  // console.log(`${data.boardId}) OFFER INIT`, data);
  try {
    const { updateWebRtc } = props;
    const { boardId, userId } = data;
    const { webRtc } = store.getState();
    await updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [userId]: { streams: [] } });
    await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, callType: webRtc.localCallHistory.callType || 'Incoming' });
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 126 });
  }
};
