import db from '../../../db';

export default async ({ id }) => {
  // console.log('delete error called', id);
  const dbRes = await db.execute(async ({ deleteQuery }) => {
    const res = await deleteQuery('ErrorReport', { id });
    return res;
  });
  return dbRes;
};
