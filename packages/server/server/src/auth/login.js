import db from '../db';
import { checkPassword } from './passwordHandler';
import googleLogin from './googleLoginHandler';
import loginHelper from './loginHelper';

export default async function login(record) {
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
