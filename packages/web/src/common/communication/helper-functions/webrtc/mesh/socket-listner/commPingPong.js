import store from '../../../../../../store';

export default (props, state, data) => {
  const { webRtc, account } = store.getState();
  // console.log('Comm ping pong called',data);
  const { apis } = state;
  if (webRtc.isLive) {
    if (webRtc.localCallHistory.chatHistory.type === 'board' && data.boardId === webRtc.localCallHistory.chatHistory.connectionId) {
      apis.commPingPong({ userId: account.user.id, boardId: data.boardId });
    }
  }
};
