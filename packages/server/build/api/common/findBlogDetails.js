'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findBlogDetails;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cache = require('../../cache/database/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findBlogDetails(blogId, userId, getBlog, uId) {
  let blog = {};
  if (getBlog) {
    blog = _cache2.default.get('Blog').find(b => b[getBlog ? 'slug' : 'id'] === blogId && b.saveStatus === 'publish');
  } else {
    blog = _cache2.default.get('Blog').find(b => b[getBlog ? 'slug' : 'id'] === blogId);
  }

  // const blogDetail = await find('BlogDetail', { blogId });
  const blogComment = _cache2.default.get('BlogComment').filter(bc => bc.blogId === blog.id);
  const blogLike = _cache2.default.get('BlogLike').filter(bl => bl.blogId === blog.id);
  let blogerId = null;
  const allUser = _cache2.default.get('User');
  const allUserDetails = _cache2.default.get('UserDetail');
  if (getBlog) {
    const userBySlug = allUser.find(u => u.slug === userId);
    blogerId = userBySlug.id;
  } else {
    blogerId = userId;
  }

  const allUserIds = _lodash2.default.uniq([parseInt(blogerId, 10), ...blogComment.map(bc => bc.userId), ...blogLike.map(bl => bl.userId), uId]);
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