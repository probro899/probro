import axios from 'axios';
import { updateMainValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState) => {
  const token = sessionStorage.getItem('SESSION_ID');
  try {
    const res = await axios.get(`${ENDPOINT}/web/fetch-initial-data?token=${token}`);
    dispatch(updateMainValue('user', { ...data }));
    const { data } = res;
    if (res.status === 200 && data.token) {
      dispatch(updateMainValue('user', { ...data }));
    }
  } catch {
    console.log('Error!');
  }
};
