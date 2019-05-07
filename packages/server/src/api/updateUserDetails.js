import db from '../db';

export default async function updateUserDetails(record, user) {
  console.log(record, user);
  try {
    const result = await db.execute(async ({ findOne, update, insert }) => {
      const findOneRes = await findOne('UserDetail', { userId: record.userId });
      if (findOneRes) {
        const updateRes = await update('UserDetail', record, { userId: record.userId });
        if (updateRes) {
          return 'User details updated successfully';
        }
        throw new Error('update Faild');
      }
      const insertRes = await insert('UserDetail', record);
      if (insertRes) {
        return 'User details inserted successfully';
      }
      return 'User details insertion faild';
    });
    return result;
  } catch (e) {
    console.log('error in upateUserdetails api', e);
    throw e;
  }
};
