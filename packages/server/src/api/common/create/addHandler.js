import add from './add';

function addBoard(test1, test2, record) {
  console.log('add board', test1, test2, record);
  return add('Board', record);
}

const addBoardColumn = record => add('BoardColumn', record);
const addBoardColumnCard = record => add('BoardColumnCard', record);
const addBoardColumnCardAttachment = record => add('BoardColumnCardAttachment', record);
const addBoardColumnCardComment = record => add('BoardColumnCardComment', record);
const addBoardColumnCardDescription = record => add('BoardColumnCardDescription', record);

const addBlog = record => add('Blog', record);
const addBlogDetail = record => add('BlogDetail', record);
const addBlogComment = record => add('BlogComment', record);
const addBlogLike = record => add('BlogLike', record);

export default [
  addBoard,
  addBoardColumn,
  addBoardColumnCard,
  addBoardColumnCardAttachment,
  addBoardColumnCardComment,
  addBoardColumnCardDescription,
  addBlog,
  addBlogComment,
  addBlogDetail,
  addBlogLike,
];
