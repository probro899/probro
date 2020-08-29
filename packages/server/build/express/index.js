'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.post('/auth/login', _login2.default);
  app.get('/auth/reset', _resetPassword2.default);
  app.get('/auth/forgot', _forgotPassword2.default);
  app.get('/auth/email-verification', _emailVerification2.default);
  app.post('/auth/user-registration', _userRegistration2.default);
  app.post('/web/upload-file', _uploadFile2.default);
  app.post('/web/delete-file', _deleteFile2.default);
  app.get('/web/do-search', _doSearch2.default);
  app.get('/web/get-user', _getUser2.default);
  app.get('/web/get-blog', _getBlog2.default);
  app.get('/web/get-index', _getIndex2.default);
  app.get('/web/get-archive', _getArchive2.default);
  app.use(_express2.default.static(_path2.default.resolve(__dirname, '..', 'public')));
  app.get('/reset/:token', (req, res) => {
    res.sendFile(_path2.default.resolve(__dirname, '..', 'public', 'index.html'));
  });
  app.get('*', (req, res) => {
    res.sendFile(_path2.default.resolve(__dirname, '..', 'public', 'index.html'));
  });
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _login = require('./request-handler/login');

var _login2 = _interopRequireDefault(_login);

var _resetPassword = require('./request-handler/resetPassword');

var _resetPassword2 = _interopRequireDefault(_resetPassword);

var _forgotPassword = require('./request-handler/forgotPassword');

var _forgotPassword2 = _interopRequireDefault(_forgotPassword);

var _userRegistration = require('./request-handler/userRegistration');

var _userRegistration2 = _interopRequireDefault(_userRegistration);

var _emailVerification = require('./request-handler/emailVerification');

var _emailVerification2 = _interopRequireDefault(_emailVerification);

var _uploadFile = require('./request-handler/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

var _deleteFile = require('./request-handler/deleteFile');

var _deleteFile2 = _interopRequireDefault(_deleteFile);

var _doSearch = require('./request-handler/doSearch');

var _doSearch2 = _interopRequireDefault(_doSearch);

var _getUser = require('./request-handler/getUser');

var _getUser2 = _interopRequireDefault(_getUser);

var _getBlog = require('./request-handler/getBlog');

var _getBlog2 = _interopRequireDefault(_getBlog);

var _getIndex = require('./request-handler/getIndex');

var _getIndex2 = _interopRequireDefault(_getIndex);

var _getArchive = require('./request-handler/getArchive');

var _getArchive2 = _interopRequireDefault(_getArchive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }