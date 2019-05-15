import db from '../db';
import cache from '../cache';
import { genHashPassword } from './passwordHandler';

export default async function resetPassword(resetToken, newPassword) {
  const userId = cache.users.get(resetToken);

  if (!userId) {
    throw new Error('Invalid token');
  }

  const password = genHashPassword(newPassword);

  await db.execute(({ update }) => {
    update('User', { password }, { id: userId });
  });
}
