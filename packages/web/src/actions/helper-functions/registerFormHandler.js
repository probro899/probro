import axios from 'axios';
import EmailValidator from 'email-validator';
import { updateFormValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState) => {
  dispatch(updateFormValue('registerForm', { loading: true, error: null, success: null }));
  const { form } = getState();
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
  } = form.registerForm;
  if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
    return dispatch(updateFormValue('registerForm', { loading: false, error: 'Please fill all the fields.' }));
  }
  if (EmailValidator.validate(email) === false) {
    return dispatch(updateFormValue('registerForm', { loading: false, error: 'Email is incorrect. Please try again.' }));
  }
  if (password !== confirmPassword) {
    return dispatch(updateFormValue('registerForm', { loading: false, error: "Password didn't match" }));
  }
  // password validation using following regex expression.
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  if (!strongRegex.test(password)) {
    return dispatch(updateFormValue('registerForm', { loading: false, error: 'Password must contain at least 8 characters, a lowercase, an uppercase, numbers and special characters.' }));
  }
  try {
    const res = await axios.post(`${ENDPOINT}/auth/user-registration`,
      {
        firstName,
        middleName,
        lastName,
        email,
        password,
      });
    if (res.status === 200) {
      dispatch(updateFormValue('registerForm',
        {
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          loading: false,
          error: null,
          success: true,
        }));
    } else if (res.status === 201) {
      dispatch(updateFormValue('registerForm', { loading: false, error: res.data }));
    }
  } catch (e) {
    dispatch(updateFormValue('registerForm', { loading: false, error: e }));
  }
};
