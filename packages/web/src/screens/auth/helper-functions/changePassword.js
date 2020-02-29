import axios from 'axios';
import { ENDPOINT } from '../../../config';

export default async (args) => {
  try {
    const res = await axios.get(`${ENDPOINT}/auth/reset?password=${args.newPassword}&token=${args.token}`);
    if (res.status === 200) {
      return { response: 200 };
    }
    return { error: res.data.error };
  } catch (e) {
    return { error: e.message };
  }
};
