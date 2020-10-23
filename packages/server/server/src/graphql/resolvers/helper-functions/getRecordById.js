import db from '../../../db';

export default async (schema, condition) => {
  const record = await db.execute(async ({ findOne }) => {
    const res = await findOne(schema, condition);
    return res;
  });
  return record;
};
