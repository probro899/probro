import deleteColumn from './deleteColumn';

export default async function deleteBoard(Delete, record) {
  await deleteColumn(Delete, { boardId: record.id });
  await Delete('Board', record);
}
