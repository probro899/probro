import store from '../../../../../store';
import autoCloseHandler from './autoCloseHandler';

export default (props, state, msg, jsep) => {
  const { updateWebRtc } = props;
  const { apis } = state;
  const { webRtc, database, account } = store.getState();
  console.log('incoming call handler called', msg, jsep, props);
  const { result } = msg;
  const userId = parseInt(result.username, 10);
  let connectionId;
  const isFind = Object.values(database.UserConnection.byId).find(c => c.mId === account.user.id && c.userId === userId);
  if (isFind) {
    connectionId = isFind.id;
  } else {
    connectionId = Object.values(database.UserConnection.byId).find(c => c.userId === account.user.id && c.mId === userId).id;
  }
  const broadCastId = parseInt(result.username, 10);
  const type = 'user';
  if (!webRtc.isLive) {
    updateWebRtc('janus', { ...webRtc.janus, jsep });
    updateWebRtc('chatHistory', { connectionId, type, user: { user: database.User.byId[broadCastId] }, broadCastId });
    updateWebRtc('showCommunication', parseInt(result.username, 10));
    updateWebRtc('localCallHistory', {
      ...webRtc.localCallHistory,
      chatHistory: {
        connectionId,
        type: 'user',
        user: { user: database.User.byId[parseInt(result.username, 10)] },
        broadCastId,
      },
      callType: webRtc.localCallHistory.callType || 'Incoming',
    });
    updateWebRtc('showIncommingCall', true);
    autoCloseHandler(props, state);
  } else {
    console.log('say i am busy now');
    apis.sfuCallStatusChange({
      callStatusDetails: {
        broadCastType: 'UserConnection',
        broadCastId,
        uid: account.user.id,
        connectionId,
        type: 'busy',
      },
      userList: [{ userId: connectionId }],
    });
  }
};
