import axios from 'axios';
import { updateFormValue } from '../index';
import { ENDPOINT } from '../../config';
import connect from '../../socket/connect';
import { updateMainValue } from '../mainHandler';

export default async (dispatch, getState) => {
  dispatch(updateFormValue('loginForm', { loading: true, error: null, success: null }));
  const { form } = getState();
  const { email, password } = form.loginForm;
  if (email === '' || password === '') {
    return dispatch(updateFormValue('loginForm', { loading: false, error: 'Enter your login credentials.' }));
  }
  try {
    const res = await axios.post(`${ENDPOINT}/auth/login`, { email, password });
    const { data } = res;
    console.log(data);
    if (res.status === 200 && data.token) {
      // connect(data);
      sessionStorage.setItem('SESSION_ID', data.token);
      // dispatch(updateMainValue('activeNav', { name: 'Profile' }));
      dispatch(updateFormValue('loginForm', {
        loading: false,
        error: null,
        success: true,
        email: '',
        password: '',
      }));
    }
  } catch {
    dispatch(updateFormValue('loginForm', { loading: false, error: 'Invalid Username or Password' }));
  }
};
