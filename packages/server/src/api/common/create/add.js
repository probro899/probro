import schema from '@probro/common/src/schema';
import db from '../../../db';
// eslint-disable-next-line import/no-cycle
import { database } from '../../../cache';

export default async function add(table, record) {
  // console.log('add api called', table, record);
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
      // console.log('inisside borad detils', boardDetails);
      if (broadCastId) {
        // console.log('inside baordcaseid', broadCastId);
        if (broadCastUserList) {
          // console.log('inside boardcastUserliSt', broadCastUserList);
          const channel = session.channel(broadCastId);
          const allChannelSession = session.getChannel(broadCastId);
          const allUserSession = [];
          broadCastUserList.forEach(userIdObj => allUserSession.push(allChannelSession.find(s => s.values.user.id === userIdObj.userId)));
          channel.dispatch(schema.add(table, boardDetails), broadCastUserList);
          database.update(table, schema.add(table, boardDetails));
        } else {
          const channel = session.channel(broadCastId);
          const allChannelSession = session.getChannel(broadCastId);
          // console.log('current channel', allChannelSession);
          channel.dispatch(schema.add(table, boardDetails), null, session.values.user.id);
          database.update(table, schema.add(table, boardDetails));
        }
      } else {
        // session.dispatch(schema.add(table, boardDetails));
        database.update(table, schema.add(table, boardDetails));
      }
    }
    // console.log('boardId', boardId);
    return boardId;
  });
  console.log('res', res);
  return res;
}
