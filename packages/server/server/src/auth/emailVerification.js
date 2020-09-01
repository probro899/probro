import db from '../db';

export default function emailVerification(token) {
  // console.log('email verification auth called', token);
  const res = db.execute(async ({ findOne, update }) => {
    const userDetailsRes = await findOne('User', { verificationToken: token });
    // console.log('userDetails REs', userDetailsRes);
    if (userDetailsRes) {
      await update('User', { verify: true }, { id: userDetailsRes.id });
      delete userDetailsRes.password;
      return userDetailsRes;
    }
    throw new Error(`Invalid token ${token}`);
  });
  return res;
}
