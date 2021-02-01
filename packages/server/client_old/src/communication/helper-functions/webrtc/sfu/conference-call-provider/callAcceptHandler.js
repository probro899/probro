import store from '../../../../../store';

export default (props) => {
  const { updateWebRtc, account } = props;
  const { webRtc } = store.getState();
  console.log('callAccept handler called', webRtc);
  const { apis } = webRtc;
  const boardId = webRtc.localCallHistory.chatHistory.connectionId;
  updateWebRtc('isLive', true);
  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'connecting');
  if (apis) {
    apis.sfuCallStatusChange({
      callStatusDetails: {
        broadCastType: 'Board',
        broadCastId: boardId,
        uid: account.user.id,
        callType: webRtc.localCallHistory.callType || 'Misscall',
        callDuration: webRtc.localCallHistory.startTime ? Date.now() - webRtc.localCallHistory.startTime : 0,
        connectionId: boardId,
        type: 'callStarted',
      },
      userList: [{ userId: account.user.id }],
    });
  }
};
