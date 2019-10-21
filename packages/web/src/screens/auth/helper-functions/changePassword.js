import axios from 'axios';
import { ENDPOINT } from '../../../config';

export default async (args) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/change-password`, args);
    const { data } = res;
    if (res.status === 200 && data.token) {
      return { response: 200 };
    }
  } catch (e) {
    return { error: e.message };
  }
};
