/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import autoCloseHandler from './autoCloseHandler';
import exceptionHandler from './exceptionHandler';

export default async (props, state, msg, jsep) => {

  try {
    const { updateWebRtc } = props;
    const { webRtc, database, account } = store.getState();
    const { apis, showIncommingCall } = webRtc;
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
    const { user } = database.UserConnection.byId[connectionId];
    if (connectionId && user) {
      if (!webRtc.isLive && !showIncommingCall && !(webRtc.communicationContainer === 'connecting')) {
        await updateWebRtc('janus', { ...webRtc.janus, jsep });
        await updateWebRtc('chatHistory', { connectionId, type, user, broadCastId });
        await updateWebRtc('showCommunication', parseInt(connectionId, 10));
        await updateWebRtc('localCallHistory', {
          ...webRtc.localCallHistory,
          chatHistory: {
            connectionId,
            type: 'user',
            user: database.UserConnection.byId[parseInt(connectionId, 10)].user,
            broadCastId,
          },
          callType: webRtc.localCallHistory.callType || 'Incoming',
        });
        await updateWebRtc('showIncommingCall', true);
        autoCloseHandler(props, state);
      } else {
        apis.sfuCallStatusChange({
          callStatusDetails: {
            broadCastType: 'UserConnection',
            broadCastId,
            uid: account.user.id,
            connectionId,
            type: 'busy',
          },
          userList: [{ userId }],
        });
      }
    } else {
      throw 'connectionId or user not found';
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 135 });
  }
};
