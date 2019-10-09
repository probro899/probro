import axios from 'axios';
import { ENDPOINT } from '../../../../config';
import connect from '../../../../socket/connect';

export default async (args) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/login`, args);
    const { data } = res;
    console.log('loginResponse', data);
    if (res.status === 200 && data.token) {
      connect(data);
      return { response: 200 };
    }
    if (res.status === 201) {
      return { error: res.data };
    }
  } catch (e) {
    return { error: e.message };
  }
};
