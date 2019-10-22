import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { user } from '../../../cache';

export default async function Update(table, value, condition) {
  const { session } = this;
  const { broadCastId } = value;
  console.log('update value', value, value);
  delete value.broadCastId;
  const res = await db.execute(async ({ update, findOne }) => {
    await update(table, value, condition);
    const findOneRes = await findOne(table, { id: condition.id });
    return findOneRes;
  });
  if (broadCastId) {
    const channel = session.channel(broadCastId);
    const allChannelSession = session.getChannel(broadCastId);
    // console.log('current channel', allChannelSession);
    channel.dispatch(schema.update(table, res));
    allChannelSession.forEach(s => user.update(schema.add(table, res), s));
  } else {
    // session.dispatch(schema.update(table, res));
    user.update(schema.update(table, res), session);
  }
}
