/* eslint-disable import/no-cycle */
import urlSlug from 'url-slug';
import add from '../../add';
import sendBlogNotificationHelper from './sendBlogNotificationHelper';

async function addBlog(record) {
  console.log('record in add blog', record);
  const { title } = record;
  const tempSlug = urlSlug(title);
  const slug = `${tempSlug}-${Date.now()}`;
  const res = await add.call(this, 'Blog', { ...record, slug });
  return { id: res, slug };
}

async function addBlogComment(record) {
  const res = await add.call(this, 'BlogComment', record);
  sendBlogNotificationHelper(this, record, 'comment');
  return res;
}

async function addBlogLike(record) {
  const res = await add.call(this, 'BlogLike', record);
  sendBlogNotificationHelper(this, record, 'like');
  return res;
}

export default [
  addBlog,
  addBlogComment,
  addBlogLike,
];
