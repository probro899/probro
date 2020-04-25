import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { database } from '../../../cache';

export default async function Update(table, value, condition) {
  try {
    console.log('Main update called', table, value, condition);
    delete value.todo;
    const { session } = this;
    const { broadCastId } = value;
    // console.log('update value', value, value);
    delete value.broadCastId;
    const res = await db.execute(async ({ update, findOne }) => {
      await update(table, value, condition);
      const findOneRes = await findOne(table, { id: condition.id });
      return findOneRes;
    });
    if (broadCastId) {
      // console.log('res', res);
      const channel = session.channel(broadCastId);
      channel.dispatch(schema.update(table, res));
      database.update(table, schema.update(table, res));
    } else {
      database.update(table, schema.update(table, res));
    }
    return res;
  } catch (e) {
    console.log('error in update', e);
  }
}
