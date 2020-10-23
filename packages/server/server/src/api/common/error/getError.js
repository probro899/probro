import db from '../../../db';

export default async () => {
  const dbRes = await db.execute(async ({ find }) => {
    const res = await find('ErrorReport');
    return res;
  });
  return dbRes;
};
