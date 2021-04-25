import db from '../../../db';

export default async () => {
  try {
    const dbRes = await db.execute(async ({ find }) => {
      const res = await find('ErrorReport');
      return res;
    });
    return dbRes;
  } catch (e) {
    console.error('Error in getError', e)
  }
};
