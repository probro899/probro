import axios from 'axios';

export default async (videoId) => {
  const accessToken = '40d4d4c09ac3d0404bde392971bb465a';
  console.log('this get video element called', videoId);
  try {
    const getVideoElementRes = await axios({
      method: 'GET',
      url: 'https://vimeo.com/api/oembed.json?url=https://vimeo.com/538041281',
      headers: {
        Authorization: `bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
    });
    console.log('getVideoElement Res', getVideoElementRes);
  } catch (e) {
    console.error(e);
  }
};
