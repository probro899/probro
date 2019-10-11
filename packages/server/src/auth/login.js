import uuid from 'uuid';
import db from '../db';
import cache from '../cache';
import { checkPassword } from './passwordHandler';

const SESSION_AGE = 7 * 86400 * 1000; // session duration of one week

export default async function login(record) {
  console.log('record in login', record);
  const { password } = record;
  const res = await db.execute(async ({ findOne }) => {
    const rec = await findOne('User', { email: record.email });
    if (rec) {
      const checkPasswordStatus = await checkPassword(password, rec.password);
      if (!rec || !checkPasswordStatus) {
        throw new Error('Invalid username/password');
      }
      if (rec.verify === '0') { throw new Error(' Your email is not verified. Please verify your email.'); }
      const userDetails = await findOne('UserDetail', { userId: rec.id });
      const token = uuid();
      const user = {
        id: rec.id,
        firstName: rec.firstName,
        lastName: rec.lastName,
        middleName: rec.middleName,
        email: rec.email,
        type: rec.type,
        token,
        userDetails: userDetails || {},
      };
      cache.users.set(token, user, SESSION_AGE);
      return { id: rec.id, token };
    }
    throw new Error('You are not register. Please register first.');
  });
  return res;
}
