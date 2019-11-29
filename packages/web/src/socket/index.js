import { connect } from './main';
import getRemoteUrl from './getRemoteUrl';
import store from '../store';
import { UPDATE_WEBRTC } from '../actions/types';

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
    console.log('reconnect try');
    client.reconnect();
  }, 1000);
};

client.on('disconnect', () => {
  console.log('disconnetct called');
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
  store.dispatch({
    type: UPDATE_WEBRTC,
    payload: null,
    schema: 'showCommunication',
  });
  store.dispatch({
    type: UPDATE_WEBRTC,
    payload: null,
    schema: 'showIncommingCall',
  });
});

client.on('error', (err) => {
  console.error('socket Error', err);
});

export { getRemoteUrl };
export default client;
