'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _api = require('../../../api');

var _flat = require('../../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (find, findOne, id) => {
  const Blog = await find('Blog', { userId: id });
  const allLike = await find('BlogLike', { userId: id });
  const allComments = await find('BlogComment', { userId: id });
  const BlogPublish = await find('Blog', { saveStatus: 'publish' });
  // console.log('all blog data', Blog, allLike, allComments, BlogPublish);
  const allAssociateBlogsId = _lodash2.default.uniq([...allComments.map(obj => obj.blogId), ...allLike.map(obj => obj.blogId), ...Blog.map(obj => obj.id), ...BlogPublish.map(obj => obj.id)]);
  // console.log('allAssociated Blog Ids', allAssociateBlogsId);
  const blogDetailsPromises = [];
  const allBlogsPromises = [];
  allAssociateBlogsId.forEach(bid => {
    blogDetailsPromises.push((0, _api.findBlogDetail)(bid));
    allBlogsPromises.push(findOne('Blog', { id: bid }));
  });

  const blogDetails = await Promise.all(blogDetailsPromises);
  const allBlogs = await Promise.all(allBlogsPromises);
  // console.log('allBlogs', allBlogs);

  const newBlogPublish = BlogPublish.filter(b => !allBlogs.find(bn => b.id === bn.id));
  // const BlogDetail = blogDetails.map(obj => obj.blogDetail).flat();
  const BlogComment = (0, _flat2.default)(blogDetails.map(obj => obj.blogComment));
  const BlogLike = (0, _flat2.default)(blogDetails.map(obj => obj.blogLike));
  const allBlogUsers = [...allBlogs, ...newBlogPublish, ...BlogLike, ...BlogComment].map(b => b.userId);
  // console.log('allBlogUsers', asllBlogUsers);
  return { allBlogs, newBlogPublish, BlogComment, BlogLike, allBlogUsers, allAssociateBlogsId };
};