// import client from './client';
const client = require('./client');
const vid = 547901551;

const deleteVideo = (vd) => {
  client.request({
    method: 'DELETE',
    path: `/videos/${vid}`,
  }, (error, body, status_code, headers) => {
    console.log('The title and description for  has been edited.', error, body, status_code, error, headers);
  });
};

deleteVideo();
