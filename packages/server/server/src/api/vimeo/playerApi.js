
const client = require('./client');

function getVideoElement(params) {
  client.request({
    method: 'GET',
    path: '/api/oembed.json?url=https://vimeo.com/538041281&width=480&height=360',
  }, (error, body, status_code, headers) => {
    console.log('GetVideo details', error, body, status_code, error, headers);
  });
}

getVideoElement();
