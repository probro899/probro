/* global window */
import store from '../store';
import { SOCKETURL, PORT, SOCKET_PROTOCOL } from '../config';

// const host = process.env.REACT_APP_SOCKET_HOST || window.location.hostname;
// const port = process.env.REACT_APP_SOCKET_PORT || window.location.port;
// const temp = 'localhost';

export default () => {
  const { sessionId } = store.getState().account;

  if (!sessionId) {
    return null;
  }
  return `${SOCKET_PROTOCOL}://${SOCKETURL}:${PORT}/shocked/web/${sessionId}`;
};
