import axios from 'axios';
import { ENDPOINT } from '../../../../config';

export default async (args) => {
  try {
    const res = await axios.get(`${ENDPOINT}/auth/forgot?email=${args.email}`);
    const { data } = res;
    if (res.status === 200 && data.token) {
      return { response: 200 };
    }
  } catch (e) {
    return { error: e.message };
  }
};
