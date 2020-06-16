/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import oneToOnePlugAttachment from './oneToOnePlugAttachment';

export default (props, closeType) => {
  const { webRtc, database, account } = store.getState();
  console.log('inside user hangup', closeType);
  const { apis, janus } = webRtc;
  janus.oneToOneCall.hangup();
  if (closeType !== 'callReject') {
    const userId = webRtc.localCallHistory.chatHistory.user.user.id;
    let connectionId;
    const isFind = Object.values(database.UserConnection.byId).find(c => c.mId === account.user.id && c.userId === userId);
    if (isFind) {
      connectionId = isFind.id;
    } else {
      connectionId = Object.values(database.UserConnection.byId).find(c => c.userId === account.user.id && c.mId === userId).id;
    }
    apis.sfuCallStatusChange({
      callStatusDetails: {
        broadCastType: 'UserConnection',
        broadCastId: userId,
        uid: account.user.id,
        callType: webRtc.localCallHistory.callType || 'Misscall',
        callDuration: webRtc.localCallHistory.startTime ? Date.now() - webRtc.localCallHistory.startTime : 0,
        connectionId,
        type: 'declined',
      },
      userList: [{ userId }],
    });
  } else {
    // detach and attach plugi[n again
    janus.oneToOneCall.detach({
      success: () => {
        // console.log('one to one techament init');
        oneToOnePlugAttachment(props);
      },
      error: (e) => {
        console.error('one to one detachement error', e);
      },
    });
  }
}