import cache from '../cache';
import db from '../db';


export default function emailVerification(token) {
  const user = cache.users.get(token);
  if (!user) {
    const res = db.execute(async ({ findOne, update }) => {
      const userDetailsRes = await findOne('User', { verificationToken: token });
      if (userDetailsRes) {
        await update('User', { verify: true }, { id: userDetailsRes.id });
        delete userDetailsRes.password;
        return userDetailsRes;
      }
      throw new Error(`Invalid token ${token}`);
    });
    return res;
  }
  return user;
}
