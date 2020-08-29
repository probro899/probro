import Cookie from '../redux/account/cookies';
import client, { getRemoteUrl } from './index';
import store from '../store';

export default (user) => {
  Cookie.set('pc-session', user.token);
  store.dispatch({
    type: 'VERIFIED',
    payload: user.token,
  });
  client.reconnect(getRemoteUrl());
};
