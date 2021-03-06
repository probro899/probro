'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _urlSlug = require('url-slug');

var _urlSlug2 = _interopRequireDefault(_urlSlug);

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _passwordHandler = require('./passwordHandler');

var _mailer = require('../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _mailBody = require('../mailer/html/mailBody');

var _mailBody2 = _interopRequireDefault(_mailBody);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _database = require('../cache/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RESET_TOKEN_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

exports.default = async record => {
  try {
    const token = await (0, _v2.default)();
    const result = await _db2.default.execute(async ({ insert, findOne }) => {
      const findUserEmailRes = await findOne('User', { email: record.email });
      const htmlStringValue = await (0, _mailBody2.default)();
      if (findUserEmailRes) {
        throw new Error('Emailisalreadytaken');
      }
      const hasPassword = await (0, _passwordHandler.genHashPassword)(record.password);
      const firstNameLowerCase = (0, _urlSlug2.default)(`${record.firstName}`);
      const lastNameLowerCase = (0, _urlSlug2.default)(`${record.lastName}`);
      const slug = `${firstNameLowerCase}-${lastNameLowerCase}-${Date.now()}`;
      const insertRes = await insert('User', _extends({}, record, { password: hasPassword, verify: false, verificationToken: token, slug }));
      _database2.default.update('User', _schema2.default.add('User', _extends({ id: insertRes }, record, { password: hasPassword, verify: false, verificationToken: token, slug })));
      if (insertRes) {
        _cache2.default.users.set(token, record.email, RESET_TOKEN_AGE);
        (0, _mailer2.default)({
          from: 'ProperClass<probro899@gmail.com>',
          to: `<${record.email}>`,
          subject: 'User email confirmation',
          text: 'No reply',
          html: htmlStringValue.registrationHtmlString(token)
        });
        return insertRes;
      }
      throw new Error('Registration faild');
    });
    return result;
  } catch (e) {
    console.log('error in userRegistration api', e);
    throw new Error(e.message);
  }
};