import db from '../../db';

export default async (boardId) => {
  try {
    const res = await db.execute(async ({ exec }) => {
      const lastActivityTimeStamp = await exec('SELECT timeStamp FROM  BoardActivity WHERE [boardId]=? ORDER BY timeStamp DESC LIMIT 1', [boardId]);
      return lastActivityTimeStamp;
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};
