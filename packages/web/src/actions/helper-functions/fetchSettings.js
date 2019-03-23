import axios from 'axios';
import { updateFormValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState) => {
  const token = sessionStorage.getItem('SESSION_ID');
  try {
    const res = await axios.get(`${ENDPOINT}/web/fetch-user-details?token=${token}`);
    const { data } = res;
    if (res.status === 200 && data.token) {
      const {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        gender,
        degree,
        field,
        profilePicture,
        skills,
        experience,
        products,
        onlinePortals,
      } = data;
      dispatch(updateFormValue('basicForm', {
        firstName: [firstName],
        middleName: [middleName],
        lastName: [lastName],
        email: [email],
      }));
      dispatch(updateFormValue('additionalForm', {
        phoneNumber: [phoneNumber],
        gender: [gender],
        degree: [degree],
        field: [field],
        profilePicture: [profilePicture],
        skills: [skills],
      }));
      dispatch(updateFormValue('advancedForm', {
        experience: [experience],
        products: [products],
        onlinePortals: [onlinePortals],
      }));
    }
  } catch {
    console.log('Error!');
  }
};
