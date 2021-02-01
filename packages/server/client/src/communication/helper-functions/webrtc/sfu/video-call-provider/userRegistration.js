import store from '../../../../../store';

export default (props) => {
  const { webRtc, account } = store.getState();
  const { apis, janus } = webRtc;
  const { oneToOneCall } = janus;
  const userId = account.user.id;
  oneToOneCall.send({ message: { request: 'register', username: `${userId}_${Date.now()}` } });
}