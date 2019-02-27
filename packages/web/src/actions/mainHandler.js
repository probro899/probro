import { UPDATE_MAIN_VALUE } from './types';
import { fetchUserCredentials } from './helper-functions';

export const updateMainValue = (schema, data) => (
  {
    type: UPDATE_MAIN_VALUE,
    payload: { schema, data },
  }
);

export const mainHandler = (schema) => {
  return async (dispatch, getState) => {
    switch (schema) {
      case 'user':
        fetchUserCredentials(dispatch, getState);
        break;
      default:
        return null;
    }
  };
};
