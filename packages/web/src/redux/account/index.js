import uuid from 'uuid';
import { login, logout } from '@probro/common/src/actions';
import Cookie from './cookies';

const slugGenerator = () => {
  const longsString = uuid();
  const shortString = longsString.substring(1, 10);
  return shortString;
};

const INITIAL_STATE = {
  sessionId: Cookie.get('pc-session'),
  slug: slugGenerator(),
  online: false,
  user: null,
};

const reducer = () => (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'VERIFIED':
      return {
        ...state,
        sessionId: action.payload,
        user: null,
      };
    case login.TYPE:
      return {
        ...state,
        user: action.payload,
      };
    case logout.TYPE:
      Cookie.clear('pc-session');
      return {
        ...state,
        user: null,
        online: false,
        sessionId: null,
      };
    case 'CONNECT':
      return {
        ...state,
        online: true,
      };
    case 'DISCONNECT':
      return {
        ...state,
        online: false,
      };
    default:
      return state;
  }
};
// eslint-disable-next-line
export { reducer };
