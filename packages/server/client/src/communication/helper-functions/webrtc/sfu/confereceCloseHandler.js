import store from '../../../../store';

export default (props) => {
  const { webRtc, account } = store.getState();
  const { janus, apis, localCallHistory } = webRtc;
  const { updateWebRtc } = props;
  const boardId = localCallHistory.chatHistory.connectionId;
  if (webRtc.isLive) {
    Object.values(webRtc.janus.remoteFeeds).forEach((rf) => {
      rf.detach({
        success: (data) => {
          // console.log(data, 'remote feed detach');
        },
      });
    });
    janus.conferenceCall.detach({
      success: (data) => {
        // console.log('success fully detched', data);
        updateWebRtc('janus', { ...webRtc.janus, conferenceCall: undefined });
      },
      error: (er) => {
        console.log('Detach error', er);
      },
    });

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
  }
};
