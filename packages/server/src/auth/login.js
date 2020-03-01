import uuid from 'uuid';
import db from '../db';
import cache from '../cache';
import { checkPassword } from './passwordHandler';

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
  return { id: rec.id, token, slug: rec.slug };
};

const googleLogin = async (grec) => {
  console.log('user login called', grec);
  const { record } = grec;
  const { email, givenName, familyName, name, googleId, imageUrl } = record;

  const res = await db.execute(async ({ findOne, insert }) => {
    const rec = await findOne('User', { email: record.email });
    if (rec) {
      const userDetails = await findOne('UserDetail', { userId: rec.id });
      return loginHelper(rec, userDetails);
    }
    const addUserRes = await insert('User', { firstName: givenName, lastName: familyName, middleName: '', password: 'googlepassword', email, verificationToken: null, verify: 1 });
    const addUserDetailRes = await insert('UserDetail', { userId: addUserRes, image: imageUrl });
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
