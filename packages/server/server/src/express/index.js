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
import verifyUser from './request-handler/verifyUser';
import getAdminUsers from './request-handler/adminGetUser';
import updateAdminUser from './request-handler/adminUpdateUser';
import addPackage from './request-handler/addPackage';
import addPackageDescription from './request-handler/addPackageDescription';
import addCallForAction from './request-handler/addCallForAction';

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
  app.post('/web/admin/verify-user', verifyUser);
  app.post('/web/admin/get-users', getAdminUsers);
  app.post('/web/admin/update-user', updateAdminUser);
  app.post('/web/admin/add-package', addPackage);
  app.post('/web/admin/add-package-description', addPackageDescription);
  app.post('/web/add-call-for-action', addCallForAction);
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
}
