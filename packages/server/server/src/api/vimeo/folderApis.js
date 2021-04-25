const client = require('./client');

function createFolder(params) {
  client.request({
    method: 'POST',
    path: '/me/projects/',
    query: {
      name: 'test',
      description: 'description',
    },
  }, (error, body, status_code, headers) => {
    console.log('GetVideo details', error, body, status_code, error, headers);
  });
}
// createFolder();

function deleteFolder(params) {
  client.request({
    method: 'DELETE',
    path: '/me/projects/4189390',
    query: {
      name: 'test',
      description: 'description',
    },
  }, (error, body, status_code, headers) => {
    console.log('GetVideo details', error, body, status_code, error, headers);
  });
}
// deleteFolder();


function editFolder(params) {
  client.request({
    method: 'PATCH',
    path: '/me/projects/4189352',
    query: {
      name: 'Entertainment',
      description: 'description',
    },
  }, (error, body, status_code, headers) => {
    console.log('GetVideo details', error, body, status_code, error, headers);
  });
}
// editFolder();


function getFolder(params) {
  client.request({
    method: 'GET',
    path: '/me/projects/4189352',
    query: {
      name: 'test updated',
      description: 'description',
    },
  }, (error, body, status_code, headers) => {
    console.log('GetVideo details', error, body, status_code, error, headers);
  });
}
// getFolder();