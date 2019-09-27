'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _passwordHandler = require('./passwordHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SESSION_AGE = 7 * 86400 * 1000; // session duration of one week

exports.default = async function login(record) {
  console.log('record in login', record);
  const { password } = record;
  const res = await _db2.default.execute(async ({ findOne }) => {
    const rec = await findOne('User', { email: record.email });
    if (rec) {
      const checkPasswordStatus = await (0, _passwordHandler.checkPassword)(password, rec.password);
      if (!rec || !checkPasswordStatus) {
        throw new Error('Invalid username/password');
      }
      if (rec.verify === '0') {
        throw new Error(' Your email is not verified. Please verify your email.');
      }
      const userDetails = await findOne('UserDetail', { userId: rec.id });
      const token = (0, _uuid2.default)();
      const user = {
        id: rec.id,
        firstName: rec.firstName,
        lastName: rec.lastName,
        middleName: rec.middleName,
        email: rec.email,
        type: rec.type,
        token,
        userDetails
      };
      _cache2.default.users.set(token, user, SESSION_AGE);
      return { id: rec.id, token };
    }
    throw new Error('You are not register. Please register first.');
  });
  return res;
};