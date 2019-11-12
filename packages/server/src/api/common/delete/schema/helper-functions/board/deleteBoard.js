import deleteColumn from './deleteColumn';
import deleteBoardMessage from './deleteBoardMessage';

export default async function deleteBoard(Delete, record) {
  console.log('deleteBoardHandler called', record, Delete);
  const { broadCastId } = record;
  delete record.broadCastId;
  await deleteColumn(Delete, { boardId: record.id, broadCastId });
  await Delete('BoardMember', { boardId: record.id, broadCastId });
  await deleteBoardMessage(Delete, { ...record, broadCastId });
  await Delete('Board', { ...record, broadCastId });
}
