import axios from 'axios';

export default async (file) => {
  // console.log('replace file called', file);
  const accessToken = '40d4d4c09ac3d0404bde392971bb465a';
  const createVideoRes = await axios({
    method: 'post',
    url: 'https://api.vimeo.com/videos/537131166/versions',
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
      name: 'Mehrama - Love Aaj Kal - Kartik - Sara - Pritam - Darshan Raval - Antara',
      description: 'Mehrama - Love Aaj Kal - Kartik - Sara - Pritam - Darshan Raval - Antara desription is comming soon',
      privacy: {
        download: false,
        embed: 'public',
        view: 'anybody',
      },
    },
  });
  console.log('replace video file res', createVideoRes);
  return createVideoRes.data;
};
