import axios from 'axios';
import { updateFormValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState) => {
  dispatch(updateFormValue('advancedForm', { loading: true, error: null, success: null }));
  const { form } = getState();
  const token = sessionStorage.getItem('SESSION_ID');
  const {
    experience, products, onlinePortals,
  } = form.advancedForm;
  try {
    const res = await axios.post(`${ENDPOINT}/web/update-user-details`, {
      token, experience, products, onlinePortals,
    });
    const { data } = res;
    if (res.status === 200 && data.token) {
      dispatch(updateFormValue('advancedForm', {
        loading: false,
        error: null,
        success: true,
      }));
    }
  } catch {
    dispatch(updateFormValue('advancedForm', { loading: false, error: 'Error to be handled.' }));
  }
};
