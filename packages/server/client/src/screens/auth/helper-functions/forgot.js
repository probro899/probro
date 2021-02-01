import axios from 'axios';
import { ENDPOINT } from '../../../config';

export default async (args) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/forgot`, {email: args.email});
    if (res.status === 200) {
      return { response: 200 };
    }
  } catch (e) {
    return { error: 'No result found' };
  }
};
