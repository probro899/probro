import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { database } from '../../../cache';

export default async function Delete(table, record) {
  // console.log('db delete called', table, record, this.session);
  try {
    const { session } = this;
    const { broadCastId } = record;
    delete record.broadCastId;

    const res = db.execute(async ({ deleteQuery }) => {
      const delRes = await deleteQuery(table, record);
      if (broadCastId) {
        const channel = session.channel(broadCastId);
        channel.dispatch(schema.remove(table, { id: record.id }));
        database.update(table, schema.remove(table, { id: record.id }));
      } else {
        // session.dispatch(schema.remove(table, { id: record.id }));
        database.update(table, schema.remove(table, { id: record.id }));
      }
      return delRes;
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}
