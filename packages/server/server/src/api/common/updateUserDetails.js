/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import db from '../../db';
import { database } from '../../cache';

export default async function updateUserDetails(record) {
  // console.log('update userDetails called', record);
  const { session } = this;

  try {
    const result = await db.execute(async ({ findOne, update, insert }) => {
      const findOneRes = await findOne('UserDetail', { userId: record.userId });
      if (findOneRes) {
        const updateRes = await update('UserDetail', record, { userId: record.userId });
        if (updateRes) {
          // console.log('updateRes', updateRes);
          const newRecord = await findOne('UserDetail', { userId: record.userId });
          session.dispatch(schema.update('UserDetail', newRecord));
          database.update('UserDetail', schema.update('UserDetail', newRecord));
          return newRecord.id;
        }
        throw new Error('update Faild');
      }
      const insertRes = await insert('UserDetail', record);
      if (insertRes) {
        const userRes = await findOne('UserDetail', { id: insertRes });
        session.dispatch(schema.add('UserDetail', userRes));
        database.update('UserDetail', schema.add('UserDetail', userRes));
        return userRes.id;
      }
      throw new Error('User details insertion faild');
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
