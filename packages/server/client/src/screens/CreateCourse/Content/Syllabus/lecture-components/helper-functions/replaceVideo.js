import axios from 'axios';

export default async (file, url) => {
  const accessToken = '40d4d4c09ac3d0404bde392971bb465a';
  try {
    const resplaceVideoRes = await axios({
      method: 'post',
      url: `https://api.vimeo.com/videos/${url}/versions`,
      headers: {
        Authorization: `bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
      data: {
        file_name: file.name,
        upload: {
          status: 'in_progress',
          approach: 'tus',
          size: file.size,
        },
        name: 'PC',
        description: 'Online Mentorship',
        privacy: {
          download: false,
          embed: 'public',
          view: 'anybody',
        },
      },
    });
    return resplaceVideoRes.data;
  } catch (e) {
    console.error('Error in replace video', e);
  }
};
