// eslint-disable-next-line import/no-cycle
import Delete from '../../delete';
import deleteBlogHelper from '../helper-functions/blog/deleteBlogAll';

function deleteBlog(record) {
  const dbDelete = Delete.bind(this);
  deleteBlogHelper(dbDelete, record);
}

async function deleteBlogComment(record) {
  const res = await Delete.call(this, 'BlogComment', record);
  return res;
}

async function deleteBlogLike(record) {
  const res = await Delete.call(this, 'BlogLike', record);
  return res;
}

async function deleteBlogBookmark(record) {
  const res = await Delete.call(this, 'BlogBookmark', record);
  return res;
}

export default [
  deleteBlog,
  deleteBlogComment,
  deleteBlogLike,
  deleteBlogBookmark,
];
