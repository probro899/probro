/* eslint-disable import/no-cycle */
import add from '../../add';

async function addBlog(record) {
  const res = await add.call(this, 'Blog', record);
  return res;
}

async function addBlogComment(record) {
  const res = await add.call(this, 'BlogComment', record);
  return res;
}

async function addBlogLike(record) {
  const res = await add.call(this, 'BlogLike', record);
  return res;
}

export default [
  addBlog,
  addBlogComment,
  addBlogLike,
];
