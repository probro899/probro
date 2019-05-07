import { login, logout } from '@probro/common/src/actions';

import Cookie from './cookies';

const INITIAL_STATE = {
  sessionId: Cookie.get('pc-session'),
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
      return {
        ...state,
        user: null,
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
