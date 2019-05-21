import Delete from './delete';
import deleteBoardHelper from './helper-functions/board/deleteBoard';
import deleteBoardColumnHelper from './helper-functions/board/deleteColumn';
import deleteBoardColumnCardHelper from './helper-functions/board/deleteBoardColumnCard';
import deleteBlogHelper from './helper-functions/blog/deleteBlogAll';

const deleteBoard = record => deleteBoardHelper(Delete, record);
const deleteBoardColumn = record => deleteBoardColumnHelper(Delete, record);
const deleteBoardColumnCard = record => deleteBoardColumnCardHelper(Delete, [record]);
const deleteBoardColumnCardAttachment = record => Delete('BoardColumnCardAttachment', record);
const deleteBoardColumnCardComment = record => Delete('BoardColumnCardComment', record);
const deleteBordColumnDescription = record => Delete('BoardColumnCardDescription', record);

const deleteBlog = record => deleteBlogHelper(Delete, record);
const deleteBlogDetail = record => Delete('BlogDetail', record);
const deleteBlogComment = record => Delete('BlogComment', record);
const deleteBlogLike = record => Delete('BlogLike', record);

export default [
  deleteBoard,
  deleteBoardColumn,
  deleteBoardColumnCard,
  deleteBoardColumnCardAttachment,
  deleteBoardColumnCardComment,
  deleteBordColumnDescription,
  deleteBlog,
  deleteBlogComment,
  deleteBlogDetail,
  deleteBlogLike,
];
