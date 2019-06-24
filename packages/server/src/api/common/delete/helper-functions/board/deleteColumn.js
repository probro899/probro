import deleteBoardColumnCard from './deleteBoardColumnCard';
import db from '../../../../../db';

export default async function deleteColumn(Delete, record) {
  // console.log('deleteColumn', record);
  const boardColumnId = await db.execute(async ({ find }) => {
    const boardColumn = await find('BoardColumn', { boardId: record.boardId });
    // console.log('boardColumn data', boardColumn);
    return boardColumn.map(obj => ({ boardColumnId: obj.id }));
  });
  // console.log('column id', boardColumnId);
  if (boardColumnId.length > 0) {
    await deleteBoardColumnCard(Delete, boardColumnId);
    await Delete('BoardColumn', record);
  } else {
    return true;
  }
  return true;
}
