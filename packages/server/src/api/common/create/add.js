import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { user } from '../../../cache';

export default async function add(table, record) {
  console.log('add api called', table, record);
  const { session } = this;
  const { broadCastId, broadCastUserList } = record;
  delete record.broadCastId;
  delete record.broadCastUserList;
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
      console.log('inisside borad detils', boardDetails);
      if (broadCastId) {
        console.log('inside baordcaseid', broadCastId);
        if (broadCastUserList) {
          console.log('inside boardcastUserliSt', broadCastUserList);
          const channel = session.channel(broadCastId);
          channel.dispatch(schema.add(table, boardDetails), broadCastUserList);
          user.update(schema.add(table, boardDetails), session);
        } else {
          const channel = session.channel(broadCastId);
          channel.dispatch(schema.add(table, boardDetails), null, session.values.user.id);
          user.update(schema.add(table, boardDetails), session);
        }
      } else {
        // session.dispatch(schema.add(table, boardDetails));
        user.update(schema.add(table, boardDetails), session);
      }
    }
    return boardId;
  });
  return res;
}
