import express from 'express';
import path from 'path';
import login from './request-handler/login';
import resetPassword from './request-handler/resetPassword';
import forgotPassword from './request-handler/forgotPassword';
import userRegistration from './request-handler/userRegistration';
import emailVerification from './request-handler/emailVerification';
import uploadFile from './request-handler/uploadFile';
import deleteFile from './request-handler/deleteFile';
import getIndex from './request-handler/getIndex';
import getErrorReport from './request-handler/getErrorReport';
import deleteError from './request-handler/deleteError';

export default function (app) {
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  //   // Request methods you wish to allow
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  //   // Set to true if you need the website to include cookies in the requests sent
  //   // to the API (e.g. in case you use sessions)
  //   res.setHeader('Access-Control-Allow-Credentials', true);
  //   next();
  // });

  app.post('/auth/login', login);
  app.post('/auth/reset', resetPassword);
  app.post('/auth/forgot', forgotPassword);
  app.post('/auth/email-verification', emailVerification);
  app.post('/auth/user-registration', userRegistration);
  app.post('/web/upload-file', uploadFile);
  app.post('/web/delete-file', deleteFile);
  app.post('/web/get-index', getIndex);
  app.post('/web/admin/error-report', getErrorReport);
  app.post('/web/admin/error-delete', deleteError);
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
}
