import store from '../../../../../../store';
import errorHandler from '../../conference-call-provider/errorHandler';

export default async (props, state, data) => {
  // console.log('offer on Communication Not Open', data);
  try {
    const { updateWebRtc } = props;
    const { boardId, userId } = data;
    const { webRtc, database } = store.getState();
    await updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, chatHistory: { type: 'board', connectionId: boardId, user: { user: database.User.byId[userId] } } });
    await updateWebRtc('showCommunication', boardId);
    await updateWebRtc('showIncommingCall', true);
  } catch (e) {
    errorHandler({ error: JSON.stringify(e), errorCode: 127 });
  }
};
