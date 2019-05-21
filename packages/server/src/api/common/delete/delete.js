import schema from '@probro/common/src/schema';
import db from '../../../db';

export default async function Delete(table, record) {
  const { session } = this;
  const res = db.execute(async ({ deleteQuery }) => {

    const delRes = await deleteQuery(table, record);

    session.dispatch(schema.remove(table, record.id));

    return delRes;
  });
  return res;
}
