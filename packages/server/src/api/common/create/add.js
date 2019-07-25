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
    const boardId = await insert(table, record);
    if (boardId) {
      const boardDetails = await findOne(table, { id: boardId });
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
