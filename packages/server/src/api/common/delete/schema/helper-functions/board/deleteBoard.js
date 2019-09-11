import deleteColumn from './deleteColumn';

export default async function deleteBoard(Delete, record) {
  // console.log('deleteBoardHandler called', record, Delete);
  await deleteColumn(Delete, { boardId: record.id });
  await Delete('Board', record);
  await Delete('BoardMember', { boardId: record.id });
}
