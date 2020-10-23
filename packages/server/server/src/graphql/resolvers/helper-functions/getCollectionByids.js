import db from '../../../db';

export default async (schema, condition) => {
  const record = await db.execute(async ({ find }) => {
    const res = await find(schema, condition);
    return res;
  });
  return record;
};
