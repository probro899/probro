import update from '../../update';

function updateBlog(records) {
  update.call(this, 'Blog', ...records);
}

function updateBlogComment(records) {
  update.call(this, 'BlogComment', ...records);
}

function updateBlogLike(records) {
  update.call(this, 'BlogLike', ...records);
}

export default [
  updateBlog,
  updateBlogComment,
  updateBlogLike
];
