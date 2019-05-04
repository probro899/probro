import db from '../db';
import { genHashPassword } from '../auth/passwordHandler';

export default async (record) => {

  try {
    const result = await db.execute(async ({ insert, findOne }) => {
      const findUserEmailRes = await findOne('User', { email: record.email });
      if (findUserEmailRes) {
        throw 'Email is already taken';
      }
      const hasPassword = await genHashPassword(record.password);
      const insertRes = await insert('User', { ...record, password: hasPassword });
      if (insertRes) {
        return 'your are registered successfully. please check your email and verify';
      }
      throw 'Registration faild';
    });
    return result;
  } catch (e) {
    console.log('error in api', e);
    throw e;
  }
};
