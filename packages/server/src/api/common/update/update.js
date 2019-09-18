import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { user } from '../../../cache';

export default async function Update(table, value, condition) {
  const { session } = this;
  const { broadCastId } = value;
  delete value.broadCastId;
  const res = await db.execute(async ({ update, findOne }) => {
    await update(table, value, condition);
    const findOneRes = await findOne(table, { id: condition.id });
    return findOneRes;
  });
  if (broadCastId) {
    const channel = session.channel(broadCastId);
    channel.dispatch(schema.update(table, res));
    user.update(schema.update(table, res), session);
  } else {
    // session.dispatch(schema.update(table, res));
    user.update(schema.update(table, res), session);
  }
}
