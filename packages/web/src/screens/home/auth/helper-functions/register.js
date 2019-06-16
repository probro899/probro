import axios from 'axios';
import { ENDPOINT } from '../../../../config';

export default async (args) => {
  delete args.confirmPassword;
  try {
    const res = await axios.post(`${ENDPOINT}/auth/user-registration`, args);
    console.log('response', res.data);
    if (res.status === 200) {
      return { response: 200 };
    }
    if (res.status === 201) {
      return { error: res.data };
    }
  } catch (e) {
    console.log('error in resgistration', e.response.body);
    return { error: e.message };
  }
};
