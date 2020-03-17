import uuid from 'uuid';
import schema from '@probro/common/src/schema';
import googleTokenVerifier from 'google-id-token-verifier';
import db from '../db';
import cache from '../cache';
import { checkPassword, genHashPassword } from './passwordHandler';
import database from '../cache/database';
import { googleClientId } from '../config';

const SESSION_AGE = 7 * 86400 * 1000; // session duration of one week

const loginHelper = async (rec, userDetails) => {
  const token = uuid();
  const user = {
    id: rec.id,
    firstName: rec.firstName,
    lastName: rec.lastName,
    middleName: rec.middleName,
    email: rec.email,
    type: rec.type,
    slug: rec.slug,
    token,
    userDetails: userDetails || {},
  };
  cache.users.set(token, user, SESSION_AGE);
  return { id: rec.id, token, slug: rec.slug, userType: rec.type };
};

const googleLogin = async (grec) => {
  console.log('user google login called', grec);
  const { record } = grec;
  const googleInfo = await new Promise((resolve, reject) => {
    googleTokenVerifier.verify(record.tokenId, googleClientId, (err, info) => {
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

  const { email, given_name, family_name, picture } = googleInfo;
  const res = await db.execute(async ({ findOne, insert }) => {
    const rec = await findOne('User', { email });
    if (rec) {
      const userDetails = await findOne('UserDetail', { userId: rec.id });
      return loginHelper(rec, userDetails);
    }
    const firstNameLowerCase = `${given_name}`.toLowerCase();
    const lastNameLowerCase = `${family_name}`.toLowerCase();
    const slug = `${firstNameLowerCase}-${lastNameLowerCase}-${Date.now()}`;
    const randomPassword = uuid();
    const addUserRes = await insert('User', { firstName: given_name, lastName: family_name, middleName: '', password: randomPassword, email, verificationToken: null, verify: 1, slug });
    database.update('User', schema.add('User', { id: addUserRes, firstName: given_name, lastName: family_name, middleName: '', password: randomPassword, email, verificationToken: null, verify: 1, slug }));
    // const addUserDetailRes = await insert('UserDetail', { userId: addUserRes, image: picture });
    // database.update('UserDetail', schema.add('UserDetail', { id: addUserDetailRes, userId: addUserRes, image: picture }));
    const finalUserDetailRes = await findOne('UserDetail', { userId: addUserRes });
    const finalUserRes = await findOne('User', { id: addUserRes });
    return loginHelper(finalUserRes, finalUserDetailRes);
  });
  return res;
};

export default async function login(record) {
  console.log('record in login', record);
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

  const res = await db.execute(async ({ findOne }) => {
    const rec = await findOne('User', { email: record.email });
    if (rec) {
      const checkPasswordStatus = await checkPassword(password, rec.password);
      if (!rec || !checkPasswordStatus) {
        throw new Error('Invalid username/password');
      }
      if (rec.verify === '0') { throw new Error(' Your email is not verified. Please verify your email.'); }
      const userDetails = await findOne('UserDetail', { userId: rec.id });
      return loginHelper(rec, userDetails);
    }
    throw new Error('You are not register. Please register first.');
  });
  return res;
}
