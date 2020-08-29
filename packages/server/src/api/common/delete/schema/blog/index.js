// eslint-disable-next-line import/no-cycle
import Delete from '../../delete';
import deleteBlogHelper from '../helper-functions/blog/deleteBlogAll';

function deleteBlog(record) {
  const dbDelete = Delete.bind(this);
  deleteBlogHelper(dbDelete, record);
}

function deleteBlogComment(record) {
  Delete.call(this, 'BlogComment', record);
}

function deleteBlogLike(record) {
  Delete.call(this, 'BlogLike', record);
}

export default [
  deleteBlog,
  deleteBlogComment,
  deleteBlogLike,
];
