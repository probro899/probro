import schema from '@probro/common/src/schema';
import db from '../../db';
// eslint-disable-next-line import/no-cycle
import { user } from '../../cache';

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
          user.update(schema.update('UserDetail', newRecord), session);
          return 'User details updated successfully';
        }
        throw new Error('update Faild');
      }
      const insertRes = await insert('UserDetail', record);
      if (insertRes) {
        const userRes = await findOne('UserDetail', { userId: insertRes });
        session.dispatch(schema.add('UserDetail', userRes));
        user.add(schema.add('UserDetail', userRes), session);
        return 'User details inserted successfully';
      }
      throw new Error('User details insertion faild');
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
