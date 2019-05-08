import axios from 'axios';
import { updateFormValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState, apis) => {
  dispatch(updateFormValue('additionalForm', { loading: true, error: null, success: null }));
  const { form } = getState();
  const token = sessionStorage.getItem('SESSION_ID');
  const {
    phoneNumber, degree, gender, field, profilePicture, skills,
  } = form.additionalForm;
  try {
    // const res = await axios.post(`${ENDPOINT}/web/update-user-details`, {
    //   token, phoneNumber, degree, gender, field, profilePicture, skills,
    // });
    await apis.updateUserDetails({ token, phoneNumber, degree, gender, field, profilePicture, skills });
    dispatch(updateFormValue('additionalForm', { loading: false, error: 'Error to be handled.' }));
    // const { data } = res;
    // if (res.status === 200 && data.token) {
    //   dispatch(updateFormValue('additionalForm', {
    //     loading: false,
    //     error: null,
    //     success: true,
    //   }));
    // }
  } catch (e) {
    console.log('error in addAdditional data', e);
    dispatch(updateFormValue('additionalForm', { loading: false, error: 'Error to be handled.' }));
  }
};
