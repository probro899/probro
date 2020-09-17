import lodash from 'lodash';
import cacheDatabase from '../../cache/database/cache';
import findUserDetails from './findUserDetails';

export default function findBlogDetails(blogId, userId, getBlog, uId) {
  let blog = {};
  if (getBlog) {
    blog = cacheDatabase.get('Blog').find(b => (b[getBlog ? 'slug' : 'id'] === blogId) && (b.saveStatus === 'publish'));
  } else {
    blog = cacheDatabase.get('Blog').find(b => b[getBlog ? 'slug' : 'id'] === blogId);
  }
  const blogComment = cacheDatabase.get('BlogComment').filter(bc => (bc.blogId === blog.id));
  const blogLike = cacheDatabase.get('BlogLike').filter(bl => (bl.blogId === blog.id));
  let blogerId = null;
  const allUser = cacheDatabase.get('User');
  const allUserDetails = cacheDatabase.get('UserDetail');
  if (getBlog) {
    const userBySlug = allUser.find(u => u.slug === userId);
    blogerId = userBySlug.id;
  } else {
    blogerId = userId;
  }

  const allUserIds = lodash.uniq([parseInt(blogerId, 10), ...blogComment.map(bc => bc.userId), ...blogLike.map(bl => bl.userId), uId]);
  const userList = allUserIds.map(uid => allUser.find(u => u.id === uid));
  const userDetailList = allUserIds.map(uid => allUserDetails.find(ud => ud.userId === uid));
  const userDetails = userList.filter(u => u).map((u, idx) => ({ user: { id: u.id, slug: u.slug, firstName: u.firstName, lastName: u.lastName, middleName: u.middleName }, userDetail: userDetailList[idx] || {} }));

  const blogWithUser = { ...blog, user: { ...findUserDetails(blog.userId).user, userDetail: findUserDetails(blog.userId).userDetail } };
  const blogUsers = userDetails.map(u => ({ ...u.user, userDetail: u.userDetail }));
  const blogLikeWithUser = blogLike.map(l => {
    const userRes = findUserDetails(l.userId);
    return { ...l, user: { ...userRes.user, userDetail: userRes.userDetail } };
  });
  const blogCommentWithuser = blogComment.map(c => {
    const userRes = findUserDetails(c.userId);
    return { ...c, user: { ...userRes.user, userDetail: userRes.userDetail } };
  });
  return { blogComment: blogCommentWithuser, blogLike: blogLikeWithUser, userDetails: blogUsers, blog: blogWithUser };
}
