import axios from 'axios';
import { ENDPOINT } from '../../../../config';

export default async (args) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/user-registration`, {
      firstName: args.firstName,
      middleName: args.middleName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
    });
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
