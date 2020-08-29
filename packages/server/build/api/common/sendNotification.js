'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _mailer = require('../../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _updateUserCache = require('./updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

var _add = require('./create/add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (context, emailObj, notiObj, sessions) => {
  try {
    const { html, subject } = emailObj;
    const notiId = await _add2.default.call(context, 'Notification', notiObj);
    const dataTobeupdateAllUser = {
      Notification: _extends({ id: notiId }, notiObj)
    };
    // notify all users
    sessions.forEach(s => {
      (0, _updateUserCache2.default)(dataTobeupdateAllUser, s, 'add');
      (0, _mailer2.default)({
        from: 'ProperClass<probro899@gmail.com>',
        to: `<${s.values.user.email}>`,
        subject,
        text: 'No reply',
        html
      });
    });
  } catch (e) {
    console.error('Error in notification', e);
  }
};