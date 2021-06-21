import axios from 'axios';

export default async (file) => {
  console.log('create file called', file);
  // const accessToken = '40d4d4c09ac3d0404bde392971bb465a';
  const newToken = '4dca9684125041866dce97d58bf8e39c';
  const createVideoRes = await axios({
    method: 'post',
    url: 'https://api.vimeo.com/me/videos',
    headers: {
      Authorization: `bearer ${newToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vimeo.*+json;version=3.4',
    },
    data: {
      upload: {
        approach: 'tus',
        size: `${file.size}`,
      },
    },
  });
  console.log('creat file res', createVideoRes);
  return createVideoRes.data;
};
