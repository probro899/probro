import schema from '@probro/common/src/schema';
import db from '../../../db';

export default async function add(table, record) {
  // console.log('add api called', table, record);
  const { session } = this;
  const res = await db.execute(async ({ insert, findOne }) => {
    const boardId = await insert(table, record);
    if (boardId) {
      const boardDetails = await findOne(table, { id: boardId });
      session.dispatch(schema.add(table, boardDetails));
    }
    return boardId;
  });
  return res;
}
