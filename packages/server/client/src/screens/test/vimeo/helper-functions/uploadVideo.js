/* eslint-disable global-require */

export default (file, uploadLink) => {
  console.log('upload video called', file, uploadLink);
  const tus = require('tus-js-client');
  // const uploadLink = 'https://asia-files.tus.vimeo.com/files/vimeo-prod-src-tus-asia/494fdd9f443973f9d30f446728abfbf0';
  const upload = new tus.Upload(file, {
    endpoint: uploadLink,
    uploadUrl: uploadLink,
    retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
      filename: file.name,
      filetype: file.type,
    },
    onError: (error) => {
      console.log('Failed because:', error);
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
      console.log(bytesUploaded, bytesTotal, percentage + "%");
    },
    onSuccess: () => {
      console.log('Download %s from %s', upload.file.name, upload.url);
    },
  });
  upload.start();
};
