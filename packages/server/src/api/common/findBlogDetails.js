import lodash from 'lodash';
import cacheDatabase from '../../cache/database/cache';

export default function findBlogDetails(blogId, userId, getBlog) {
  let blog = {};
  if (getBlog) {
    blog = cacheDatabase.get('Blog').find(b => (b[getBlog ? 'slug' : 'id'] === blogId) && (b.saveStatus === 'publish'));
  } else {
    blog = cacheDatabase.get('Blog').find(b => b[getBlog ? 'slug' : 'id'] === blogId);
  }

  // const blogDetail = await find('BlogDetail', { blogId });
  const blogComment = cacheDatabase.get('BlogComment').filter(bc => (bc.blogId === getBlog ? blog.id : blogId));
  const blogLike = cacheDatabase.get('BlogLike').filter(bl => (bl.blogId === getBlog ? blog.id : blogId));
  let blogerId = null;
  const allUser = cacheDatabase.get('User');
  const allUserDetails = cacheDatabase.get('UserDetail');
  if (getBlog) {
    const userBySlug = allUser.find(u => u.slug === userId);
    blogerId = userBySlug.id;
  } else {
    blogerId = userId;
  }

  const allUserIds = lodash.uniq([parseInt(blogerId, 10), ...blogComment.map(bc => bc.userId), ...blogLike.map(bl => bl.userId)]);
  // console.log('allUserIds', allUserIds);
  // const userListPromises = [];
  // const userDetailPromises = [];
  // // console.log('allUserIds', allUserIds);
  // allUserIds.filter(i => i).forEach((id) => {
  //   userListPromises.push(findOne('User', { id }));
  //   userDetailPromises.push(findOne('UserDetail', { userId: id }));
  // });
  const userList = allUserIds.map(uid => allUser.find(u => u.id === uid));
  const userDetailList = allUserIds.map(uid => allUserDetails.find(ud => ud.userId === uid));
  // console.log('usreList', userList);
  const userDetails = userList.filter(u => u).map((u, idx) => ({ user: { id: u.id, slug: u.slug, firstName: u.firstName, lastName: u.lastName, middleName: u.middleName }, userDetail: userDetailList[idx] || {} }));
  return { blogComment, blogLike, userDetails, blog };
}
