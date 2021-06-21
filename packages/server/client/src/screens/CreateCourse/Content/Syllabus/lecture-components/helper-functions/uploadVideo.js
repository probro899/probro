/* eslint-disable global-require */

export default (file, uploadLink, statusUpdate, onComplete, resourceData) => {
    const tus = require('tus-js-client');
    const upload = new tus.Upload(file, {
      endpoint: uploadLink,
      uploadUrl: uploadLink,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError: (error) => {
        // console.log('Failed because:', error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
        statusUpdate(percentage);
      },
      onSuccess: () => {
        onComplete({ ...resourceData, name: upload.file.name });
      },
    });
    upload.start();
  };
  