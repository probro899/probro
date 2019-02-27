import { UPDATE_FORM_VALUE } from './types';
import { registerFormHandler, loginFormHandler } from './helper-functions';

export const updateFormValue = (schema, data) => (
  {
    type: UPDATE_FORM_VALUE,
    payload: { schema, data },
  }
);

export const mainFormHandler = (schema) => {
  return async (dispatch, getState) => {
    switch (schema) {
      case 'registerForm':
        registerFormHandler(dispatch, getState);
        break;
      case 'loginForm':
        loginFormHandler(dispatch, getState);
        break;
      default:
        return null;
    }
  };
};
