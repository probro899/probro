/* eslint-disable import/no-cycle */
import add from '../../add';

function addBlog(record) {
  const res = add.call(this, 'Blog', record);
  return res;
}

function addBlogComment(record) {
  add.call(this, 'BlogComment', record);
}

function addBlogLike(record) {
  add.call(this, 'BlogLike', record);
}

export default [
  addBlog,
  addBlogComment,
  addBlogLike,
];
