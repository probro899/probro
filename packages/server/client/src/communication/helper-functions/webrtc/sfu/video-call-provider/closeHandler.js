/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import oneToOnePlugAttachment from './attachPlugin';
import exceptionHandler from './exceptionHandler';

export default async (props, closeType) => {
  // console.log(' video callCloseHandler called', closeType);
  try {
    const { webRtc, database, account } = store.getState();
    const { apis, janus } = webRtc;
    const { oneToOneCall } = janus;
    if (oneToOneCall) {
      // console.log('oneToOneCall hangup execute');
      oneToOneCall.hangup();
      if (closeType !== 'callReject') {
        if (webRtc.localCallHistory.chatHistory) {
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
          const detachRes = await new Promise((resolve, reject) => {
            oneToOneCall.detach({
              success: () => {
                resolve(true);
              },
              error: (e) => {
                reject(e);
              },
            });
          });
          if (detachRes) {
            oneToOnePlugAttachment(props);
          }
        }
      } else {
        // detach and attach plugi[n again
        console.log('plugin attach and detach called');
        const detachRes = await new Promise((resolve, reject) => {
          oneToOneCall.detach({
            success: () => {
              resolve(true);
            },
            error: (e) => {
              reject(e);
            },
          });
        });
        if (detachRes) {
          oneToOnePlugAttachment(props);
        }
      }
    } else {
      throw 'Video plugin not found';
    }
  } catch (e) {
    console.log(' error while closing one to one call', e);
    exceptionHandler({ error: JSON.stringify(e), errorCode: 140 });
  }
};
