import axios from 'axios';
import { resetMainValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState) => {
  // eslint-disable-next-line no-undef
  const token = sessionStorage.getItem('SESSION_ID');
  try {
    const res = await axios.get(`${ENDPOINT}/web/user-logout?token=${token}`);
    if (res.status === 200) {
      sessionStorage.clear();
      dispatch(resetMainValue('user', { }));
    }
  } catch (e) {
    console.log(e);
  }
};
