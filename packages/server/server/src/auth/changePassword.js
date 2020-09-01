import db from '../db';
import { checkPassword, genHashPassword } from './passwordHandler';

export default async function changePassword(userId, oldPassword, newPassword) {
  return db.execute(async ({ update, findOne }) => {
    const record = await findOne('User', { id: userId });
    if (!record || !checkPassword(oldPassword, record.password)) {
      throw new Error('Invalid password');
    }

    const password = genHashPassword(newPassword);
    // Change the password
    await update('User', { password }, { id: userId });
  });
}
