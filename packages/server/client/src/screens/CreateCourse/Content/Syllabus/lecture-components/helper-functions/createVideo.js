import axios from 'axios';

export default async (file) => {
    const accessToken = '40d4d4c09ac3d0404bde392971bb465a';
    const createVideoRes = await axios({
        method: 'post',
        url: 'https://api.vimeo.com/me/videos',
        headers: {
        Authorization: `bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
        },
        data: {
            upload: {
                approach: 'tus',
                size: file.size,
            },
        },
    });
    return createVideoRes.data;
};
