import store from '../../../../../store';

export default (joinToken) => {
  // console.log('classjoinHandler called', joinToken);
  const { webRtc, account } = store.getState();
  const userId = account.user.id;
  const { janus, localCallHistory } = webRtc;
  const roomId = localCallHistory.chatHistory.connectionId;
  const register = { request: 'join', room: roomId, ptype: 'publisher', display: `${userId}`, pin: joinToken };
  janus.conferenceCall.send({ message: register });
};
