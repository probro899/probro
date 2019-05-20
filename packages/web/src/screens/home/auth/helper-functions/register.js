import axios from 'axios';
import { ENDPOINT } from '../../../../config';

export default async (args) => {
  delete args.confirmPassword;
  try {
    const res = await axios.post(`${ENDPOINT}/auth/user-registration`, args);
    if (res.status === 200) {
      return { response: 200 };
    }
  } catch (e) {
    return { error: e.message };
  }
};
