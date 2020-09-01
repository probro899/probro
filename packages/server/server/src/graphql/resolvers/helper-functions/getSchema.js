import db from '../../../db';

export default async (schema, condition) =>  {
  const list = await db.execute(async ({ find }) => {
    let res = [];
    if (condition) {
      res = await find(schema, condition);
      return res;
    }
    res = await find(schema);
    return res;
  });
  return list;
};
