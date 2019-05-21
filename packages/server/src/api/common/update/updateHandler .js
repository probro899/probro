import update from './update';

const updateBoard = records => update('Board', ...records);
const updateBoardColumn = records => update('BoardColumn', ...records);
const updateBoardColumnCard = records => update('BoardColumnCard', ...records);
const updateBoardColumnCardAttachment = records => update('BoardColumnCardAttachment', ...records);
const updateBoardColumnCardComment = records => update('BoardColumnCardComment', ...records);
const updateBoardColumnCardDescription = records => update('BoardColumnCardDescription', ...records);

const updateBlog = records => update('Blog', ...records);
const updateBlogDetail = records => update('BlogDetail', ...records);
const updateBlogComment = records => update('BlogComment', ...records);
const updateBlogLike = records => update('BlogLike', ...records);

export default [
  updateBoard,
  updateBoardColumn,
  updateBoardColumnCard,
  updateBoardColumnCardAttachment,
  updateBoardColumnCardComment,
  updateBoardColumnCardDescription,
  updateBlog,
  updateBlogComment,
  updateBlogDetail,
  updateBlogLike,
];
