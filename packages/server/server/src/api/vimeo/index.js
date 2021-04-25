import client from '../../vimeo';

async function addVideoDescription(params) {
  console.log('addVideoDescription called', params);
  try {
    const { name, description } = params;

    const getInfoRes = client.request({
      method: 'GET',
      path: '/videos/537131166',
      // query: {
      //   name,
      //   description,
      // },
    }, (error, body, status_code, headers) => {
      console.log('GetVideo details', error, body, status_code, error, headers);
    });

    const res = client.request({
      method: 'PATCH',
      path: '/videos/537131166',
      query: {
        name,
        description,
      },
    }, (error, body, status_code, headers) => {
      console.log('The title and description for  has been edited.', error, body, status_code, error, headers);
    });
    console.log('res in addVideoDescription', res);
    return res;
  } catch (e) {
    console.Error('Error in adVideoDescription', e);
  }
}

export {
  addVideoDescription,
};
