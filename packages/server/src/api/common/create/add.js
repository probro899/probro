import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { user } from '../../../cache';

export default async function add(table, record) {
  // console.log('add api called', table, record);
  const { session } = this;
  const { broadCastId } = record;
  delete record.broadCastId;
  const res = await db.execute(async ({ insert, findOne }) => {
    let boardId = null;
    let boardDetails = null;
    if (Array.isArray(record)) {
      const promises = record.map(obj => insert(table, obj));
      const skillIds = await Promise.all(promises);
      const findOneAllRes = skillIds.map(id => findOne(table, { id }));
      boardDetails = await Promise.all(findOneAllRes);
    } else {
      boardId = await insert(table, record);
      boardDetails = await findOne(table, { id: boardId });
    }
    if (boardDetails) {
      if (broadCastId) {
        const channel = session.channel(broadCastId);
        channel.dispatch(schema.add(table, boardDetails));
        user.update(schema.add(table, boardDetails), session);
      } else {
        session.dispatch(schema.add(table, boardDetails));
        user.update(schema.add(table, boardDetails), session);
      }
    }
    return boardId;
  });
  return res;
}
