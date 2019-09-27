'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = emailVerification;

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emailVerification(token) {
  console.log('email verification auth called', token);
  const res = _db2.default.execute(async ({ findOne, update }) => {
    const userDetailsRes = await findOne('User', { verificationToken: token });
    console.log('userDetails REs', userDetailsRes);
    if (userDetailsRes) {
      await update('User', { verify: true }, { id: userDetailsRes.id });
      delete userDetailsRes.password;
      return userDetailsRes;
    }
    throw new Error(`Invalid token ${token}`);
  });
  return res;
}