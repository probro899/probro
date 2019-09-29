/* global window */

import store from '../store';
import { SOCKETURL } from '../config';

const protocol = 'wss';
const host = process.env.REACT_APP_SOCKET_HOST || window.location.hostname;
const port = 4001;
// const port = process.env.REACT_APP_SOCKET_PORT || window.location.port;
// const temp = 'localhost';

export default () => {
  const { sessionId } = store.getState().account;

  if (!sessionId) {
    return null;
  }
  // return `${protocol}://${host}:${port}/shocked/web/${sessionId}`;
  return `${protocol}://${SOCKETURL}:${port}/shocked/web/${sessionId}`;
};
