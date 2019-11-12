import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { user } from '../../../cache';

export default async function Delete(table, record) {
  console.log('db delete called', table, record, this.session);
  try {
    const { session } = this;
    const { broadCastId } = record;
    delete record.broadCastId;

    const res = db.execute(async ({ deleteQuery }) => {
      const delRes = await deleteQuery(table, record);
      if (broadCastId) {
        const channel = session.channel(broadCastId);
        channel.dispatch(schema.remove(table, { id: record.id }));
        const allUserSession = session.getChannel(broadCastId);
        allUserSession.forEach(s => user.update(schema.remove(table, { id: record.id }), s));
      } else {
        // session.dispatch(schema.remove(table, { id: record.id }));
        user.update(schema.remove(table, { id: record.id }), session);
      }
      return delRes;
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}
