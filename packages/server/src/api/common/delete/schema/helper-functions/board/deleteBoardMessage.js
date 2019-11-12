import db from '../../../../../../db';

export default async function deleteBoardMessage(Delete, record) {
  const boardMessageseenPromises = [];
  const { broadCastId } = record;

  const boardMessageRes = await db.execute(async ({ find }) => {
    const allboardMssage = await find('BoardMessage', { boardId: record.boardId });
    return allboardMssage;
  });
  boardMessageRes.forEach((bm) => {
    boardMessageseenPromises.push(Delete('BoardMessageSeenStatus', { bmId: bm.id, broadCastId }));
  });
  await Promise.all(boardMessageseenPromises);
  await Delete('BoardMessage', { boardId: record.broadId, broadCastId });
}
