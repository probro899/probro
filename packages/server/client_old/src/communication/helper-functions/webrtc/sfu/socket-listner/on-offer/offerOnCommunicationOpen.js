import store from '../../../../../../store';
import exceptionHandler from '../../conference-call-provider/exceptionHandler';

const onNotLiveHandler = async (updateWebRtc, webRtc, database, boardId, userId) => {
  // console.log('Communication is not live', database);
  await updateWebRtc('communicationContainer', 'list');
  await updateWebRtc('showCommunication', boardId);
  await updateWebRtc('localCallHistory', {
    ...webRtc.localCallHistory,
    chatHistory: {
      connectionId: boardId,
      type: 'board',
      user: { user: database.User.byId[userId] },
    },
  });
  updateWebRtc('showIncommingCall', true);
};

const onLiveHandler = async (props, state, data) => {
  try {
    // console.log('communication On live handler');
  } catch (e) {
    console.error('erro in onlive offer handler', e);
  }
};

export default async (props, state, data) => {
  // console.log('Offer on Live handler called', data);
  try {
    const { database } = store.getState();
    const { updateWebRtc } = props;
    const { userId, boardId } = data;
    const { webRtc } = store.getState();
    if (!webRtc.isLive) {
      await onNotLiveHandler(updateWebRtc, webRtc, database, boardId, userId);
    } else {
      await onLiveHandler(props, state, data);
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 128 });
  }
};
