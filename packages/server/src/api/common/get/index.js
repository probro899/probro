import db from '../../../db';

async function getBoardActivity(record) {
  console.log('getBoard Actificyt api called', record);
  const { boardId } = record;
  const res = await db.execute(async ({ find }) => {
    const boardActivities = await find('BoardActivity', { boardId });
    const boardCommunicationActivities = await find('BoardMessage', { boardId });
    return { boardActivities, boardCommunicationActivities };
  });
  return res;
}

export default [
  getBoardActivity,
];
