import { UPDATE_FORM_VALUE } from './types';
import {
  registerFormHandler,
  loginFormHandler,
  basicFormHandler,
  additionalFormHandler,
  advancedFormHandler,
  fetchSettings,
} from './helper-functions';

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
      case 'basicForm':
        basicFormHandler(dispatch, getState);
        break;
      case 'additionalForm':
        additionalFormHandler(dispatch, getState);
        break;
      case 'advancedForm':
        advancedFormHandler(dispatch, getState);
        break;
      case 'initSettingForms':
        fetchSettings(dispatch, getState);
        break;
      default:
        return null;
    }
  };
};
