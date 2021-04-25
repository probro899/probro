import db from '../../../db';

export default async ({ id }) => {
  try {
    // console.log('delete error called', id);
  const dbRes = await db.execute(async ({ deleteQuery }) => {
    const res = await deleteQuery('ErrorReport', { id });
    return res;
  });
  return dbRes;
  } catch (e) {
    console.error('Error in deleteError', e);
  }
};
