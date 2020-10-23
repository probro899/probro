/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';

export default async (props) => {
  try {
    // console.log('conference close handler called', props);
    const { webRtc, account } = store.getState();
    const { janus, apis, localCallHistory } = webRtc;
    const { updateWebRtc } = props;
    const boardId = localCallHistory.chatHistory.connectionId;

    if (webRtc.isLive) {
      const allRemoteFeeds = Object.values(webRtc.janus.remoteFeeds);
      const allDetachSubscriberPromise = [];
      if (allRemoteFeeds.length > 0) {
        allRemoteFeeds.forEach((rf) => {
          allDetachSubscriberPromise.push(new Promise((resolve) => {
            rf.detach({
              success: () => {
                resolve(true);
              },
              error: () => {
                resolve(false);
              },
            });
          }));
        });
      }

      const subscriberDetachRes = await Promise.all(allDetachSubscriberPromise);
      const isAnySubscriberNotDetach = subscriberDetachRes.find(ds => !ds);

      if (!isAnySubscriberNotDetach) {
        await updateWebRtc('janus', { ...webRtc.janus, remoteFeeds: {} });
      } else {
        throw 'Subscriber detach error';
      }

      const publisherDetachRes = await new Promise((resolve) => {
        janus.conferenceCall.detach({
          success: () => {
            resolve({ success: true });
          },
          error: (error) => {
            resolve({ error, errorCode: 123 });
          },
        });
      });

      if (publisherDetachRes.success) {
        const latestWebrtcData = store.getState().webRtc;
        await updateWebRtc('janus', { ...latestWebrtcData.janus, conferenceCall: undefined });
      } else {
        throw publisherDetachRes;
      }

      // server informer to close with localhistory
      apis.sfuCallStatusChange({
        callStatusDetails: {
          broadCastType: 'Board',
          broadCastId: boardId,
          uid: account.user.id,
          callType: webRtc.localCallHistory.callType || 'Misscall',
          callDuration: webRtc.localCallHistory.startTime ? Date.now() - webRtc.localCallHistory.startTime : 0,
          connectionId: boardId,
          type: 'declined',
        },
        userList: [{ userId: account.user.id }],
      });

      if (publisherDetachRes && !isAnySubscriberNotDetach) {
        return true;
      }
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 122 });
  }
};
