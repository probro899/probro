'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _mailer = require('../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RESET_TOKEN_AGE = 1 * 60 * 60 * 1000; // 1 hour

const domain = process.env.RESTRO_DOMAIN || 'http://localhost:3000';

exports.default = async function forgot(username) {

  const user = await _db2.default.execute(({ findOne }) => findOne('User', { email: username }));

  if (!user) {
    throw new Error('Unknown username');
  }

  const resetToken = (0, _v2.default)();

  // Include a reset token on cache

  _cache2.default.users.set(resetToken, user.id, RESET_TOKEN_AGE);
  (0, _mailer2.default)({
    from: 'ProperClass<noreply@properclass.com>',
    to: user.email,
    subject: 'Password reset',
    text: `Please use the following link to reset your password ${domain}/reset/${resetToken}`
  });
  return user;
};