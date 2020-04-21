'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _googleIdTokenVerifier = require('google-id-token-verifier');

var _googleIdTokenVerifier2 = _interopRequireDefault(_googleIdTokenVerifier);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _passwordHandler = require('./passwordHandler');

var _database = require('../cache/database');

var _database2 = _interopRequireDefault(_database);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SESSION_AGE = 7 * 86400 * 1000; // session duration of one week

const loginHelper = async (rec, userDetails) => {
  const token = (0, _uuid2.default)();
  const user = {
    id: rec.id,
    firstName: rec.firstName,
    lastName: rec.lastName,
    middleName: rec.middleName,
    email: rec.email,
    type: rec.type,
    slug: rec.slug,
    token,
    userDetails: userDetails || {}
  };
  _cache2.default.users.set(token, user, SESSION_AGE);
  return { id: rec.id, token, slug: rec.slug, userType: rec.type };
};

const googleLogin = async grec => {
  // console.log('user google login called', grec);
  const { record } = grec;
  const { profileObj } = record;
  const { imageUrl, name, givenName, familyName } = profileObj;

  const googleInfo = await new Promise((resolve, reject) => {
    _googleIdTokenVerifier2.default.verify(record.tokenId, _config.googleClientId, (err, info) => {
      if (err) {
        console.log('Google token verification faild', info);
        reject();
        return;
      }
      if (info) {
        resolve(info);
      }
    });
  });

  const { email } = googleInfo;
  const res = await _db2.default.execute(async ({ findOne, insert }) => {
    const rec = await findOne('User', { email });
    if (rec) {
      const userDetails = await findOne('UserDetail', { userId: rec.id });
      return loginHelper(rec, userDetails);
    }
    const firstNameLowerCase = `${givenName}`.toLowerCase();
    const lastNameLowerCase = `${familyName}`.toLowerCase();
    const slug = `${firstNameLowerCase}-${lastNameLowerCase}-${Date.now()}`;
    const randomPassword = (0, _uuid2.default)();
    const addUserRes = await insert('User', { firstName: givenName, lastName: familyName, middleName: '', password: randomPassword, email, verificationToken: null, verify: 1, slug });
    _database2.default.update('User', _schema2.default.add('User', { id: addUserRes, firstName: givenName, lastName: familyName, middleName: '', password: randomPassword, email, verificationToken: null, verify: 1, slug }));
    // const addUserDetailRes = await insert('UserDetail', { userId: addUserRes, image: picture });
    // database.update('UserDetail', schema.add('UserDetail', { id: addUserDetailRes, userId: addUserRes, image: picture }));
    const finalUserDetailRes = await findOne('UserDetail', { userId: addUserRes });
    const finalUserRes = await findOne('User', { id: addUserRes });
    return loginHelper(finalUserRes, finalUserDetailRes);
  });
  return res;
};

exports.default = async function login(record) {
  // console.log('record in login', record);
  const { password, loginType } = record;
  let googleRes;
  if (loginType) {
    switch (loginType) {
      case 'google':
        googleRes = await googleLogin(record);
        return googleRes;
      default:
        return 'invalid login type';
    }
  }

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
      return loginHelper(rec, userDetails);
    }
    throw new Error('You are not register. Please register first.');
  });
  return res;
};