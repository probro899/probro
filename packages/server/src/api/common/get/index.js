import db from '../../../db';

async function getBoardActivity(record) {
  console.log('getBoard Actificyt api called', record);
  const { boardId } = record;
  const res = await db.execute(async ({ find }) => {
    const dbRes = await find('BoardActivity', { boardId });
    return dbRes;
  });
  return res;
}

export default [
  getBoardActivity,
];
