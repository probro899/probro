/* eslint-disable import/no-cycle */
import urlSlug from 'url-slug';
import add from '../../add';
import sendBlogNotificationHelper from './sendBlogNotificationHelper';

async function addBlog(record) {
  // console.log('record in add blog', record);
  try {
    const { title } = record;
    const tempSlug = urlSlug(title);
    const slug = `${tempSlug}-${Date.now()}`;
    const res = await add.call(this, 'Blog', { ...record, slug });
    return { id: res, slug };
  } catch (e) {
    console.error('Error in addBlog', e);
  }
}

async function addBlogComment(record) {
  try {
    const res = await add.call(this, 'BlogComment', record);
    sendBlogNotificationHelper(this, record, 'comment');
    return res;
  } catch (e) {
    console.error('Error in addBlogComment', e);
  }
}

async function addBlogLike(record) {
  try {
    const res = await add.call(this, 'BlogLike', record);
    sendBlogNotificationHelper(this, record, 'like');
    return res;
  } catch (e) {
    console.error('Error in addBlogLike', e);
  }
}

export default [
  addBlog,
  addBlogComment,
  addBlogLike,
];
