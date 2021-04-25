const client = require('./client');

function moveVideoToFolder(params) {
  client.request({
    method: 'PUT',
    path: '/me/projects/4189352/videos/537131166',
    query: {
      uris: "['/videos/537131166']",
    },
  }, (error, body, status_code, headers) => {
    console.log('GetVideo details', error, body, status_code, error, headers);
  });
}

// moveVideoToFolder();
function editVideoPrivacy(params) {
  const res = client.request({
    method: 'PATCH',
    path: '/videos/537131166',
    query: {
      name: 'update test',
      privacy: {
        view: 'password',
      },
      password: 'helloworld',
    },
  }, (error, body, status_code, headers) => {
    console.log('The title and description for  has been edited.', error, body, status_code, error, headers);
  });
}
editVideoPrivacy();
