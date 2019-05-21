import add from './add';

function addBoard(record) {
  add.call(this, 'Board', record);
}

function addBoardColumn(record) {
  add.call(this, 'BoardColumn', record);
}

function addBoardColumnCard(record) {
  add.call(this, 'BoardColumnCard', record);
}

function addBoardColumnCardAttachment(record) {
  add.call(this, 'BoardColumnCardAttachment', record);
}

function addBoardColumnCardComment(record) {
  add.call(this, 'BoardColumnCardComment', record);
}

function addBoardColumnCardDescription(record) {
  add.call(this, 'BoardColumnCardDescription', record);
}

function addBlog(record) {
  add.call(this, 'Blog', record);
}

function addBlogDetail(record) {
  add.call(this, 'BlogDetail', record);
}

function addBlogComment(record) {
  add.call(this, 'BlogComment', record);
}

function addBlogLike(record) {
  add.call(this, 'BlogLike', record);
}

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
