import axios from 'axios';
import { updateFormValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState) => {
  dispatch(updateFormValue('basicForm', { loading: true, error: null, success: null }));
  const { form } = getState();
  const token = sessionStorage.getItem('SESSION_ID');
  const {
    firstName, middleName, lastName, email,
  } = form.basicForm;
  try {
    const res = await axios.post(`${ENDPOINT}/web/update-user-details`, {
      token, firstName, middleName, lastName, email,
    });
    const { data } = res;
    if (res.status === 200 && data.token) {
      dispatch(updateFormValue('basicForm', {
        loading: false,
        error: null,
        success: true,
      }));
    }
  } catch {
    dispatch(updateFormValue('basicForm', { loading: false, error: 'Error to be handled.' }));
  }
};
