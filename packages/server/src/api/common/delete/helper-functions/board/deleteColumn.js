import deleteBoardColumnCard from './deleteBoardColumnCard';
import db from '../../../../../db';

export default async function deleteColumn(Delete, record) {

  const boardColumnId = await db.execute(async ({ find }) => {
    const boardColumn = await find('BoardColumn', record);
    return boardColumn.map(obj => ({ boardColumnId: obj.id }));
  });

  await deleteBoardColumnCard(Delete, boardColumnId);
  await Delete('BoardColumn', record);
}
