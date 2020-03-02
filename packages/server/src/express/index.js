import express from 'express';
import path from 'path';
import login from './request-handler/login';
import resetPassword from './request-handler/resetPassword';
import forgotPassword from './request-handler/forgotPassword';
import userRegistration from './request-handler/userRegistration';
import emailVerification from './request-handler/emailVerification';
import uploadFile from './request-handler/uploadFile';
import deleteFile from './request-handler/deleteFile';
import doSearch from './request-handler/doSearch';
import getUser from './request-handler/getUser';
import getBlog from './request-handler/getBlog';
import getIndex from './request-handler/getIndex';
import advanceSearch from './request-handler/advanceSearch';

export default function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.post('/auth/login', login);
  app.get('/auth/reset', resetPassword);
  app.get('/auth/forgot', forgotPassword);
  app.get('/auth/email-verification', emailVerification);
  app.post('/auth/user-registration', userRegistration);
  app.post('/web/upload-file', uploadFile);
  app.post('/web/delete-file', deleteFile);
  app.get('/web/do-search', doSearch);
  app.get('/web/advance-search', advanceSearch);
  app.get('/web/get-user', getUser);
  app.get('/web/get-blog', getBlog);
  app.get('/web/get-index', getIndex);
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.get('/reset/:token', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });
}
