import axios from 'axios';
import { updateMainValue } from '../index';
import { ENDPOINT } from '../../config';

export default async (dispatch, getState) => {
  // eslint-disable-next-line no-undef
  const token = sessionStorage.getItem('SESSION_ID');
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  const { main } = getState();
  formData.append('image', main.user.profilePicture);
  formData.append('token', token);
  try {
    const res = await axios({
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      method: 'post',
      url: `${ENDPOINT}/web/upload-image`,
      data: formData,
    });
    const { data } = res;
    if (res.status === 200 && data.token) {
      dispatch(updateMainValue('user', { ...data }));
    }
  } catch (e) {
    console.log(e);
  }
};
