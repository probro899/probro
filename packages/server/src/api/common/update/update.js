import schema from '@probro/common/src/schema';
import db from '../../../db';

export default async function Update(table, value, condition) {
  const { session } = this;
  const res = await db.execute(async ({ update, findOne }) => {
    await update(table, value, condition);
    const findOneRes = await findOne(table, condition.id);
    return findOneRes;
  });

  session.dispatch(schema.update(table, res));
}
