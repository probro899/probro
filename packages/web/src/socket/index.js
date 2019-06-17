import { connect } from './main';
import getRemoteUrl from './getRemoteUrl';
import store from '../store';

const client = connect(getRemoteUrl(), store);

let retryConnect = true;
let retryTimer = null;

client.on('connect', () => {
  retryConnect = true;
  store.dispatch({
    type: 'CONNECT',
  });
});


const reconnect = () => {
  if (retryTimer) {
    return;
  }

  retryTimer = setTimeout(() => {
    retryTimer = null;
    client.reconnect();
  }, 1000);
};

client.on('disconnect', () => {
  store.dispatch({
    type: 'DISSCONNECT',
  });
  // Try to establish a connection after a timeout

  if (retryConnect) {
    reconnect();
  }
});

client.on('logout', () => {
  retryConnect = false;
});

client.on('error', (err) => {
  console.error('socket Error', err);
});

export { getRemoteUrl };
export default client;
