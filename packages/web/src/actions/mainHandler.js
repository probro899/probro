import { UPDATE_MAIN_VALUE, RESET_MAIN_VALUE } from './types';
import { fetchUserCredentials, updateProfilePicture, logout } from './helper-functions';

export const updateMainValue = (schema, data) => (
  {
    type: UPDATE_MAIN_VALUE,
    payload: { schema, data },
  }
);

export const resetMainValue = (schema, data) => (
  {
    type: RESET_MAIN_VALUE,
    payload: { schema, data },
  }
);

export const mainHandler = (schema) => {
  return async (dispatch, getState) => {
    switch (schema) {
      case 'user':
        fetchUserCredentials(dispatch, getState);
        break;
      case 'updateProfilePicture':
        updateProfilePicture(dispatch, getState);
        break;
      case 'logout':
        logout(dispatch, getState);
        break;
      default:
        return null;
    }
  };
};
