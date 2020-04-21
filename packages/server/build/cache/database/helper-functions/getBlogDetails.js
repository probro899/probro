'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _api = require('../../../api');

var _flat = require('../../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = id => {
  const allDbBlogs = _cache2.default.get('Blog');
  const Blog = allDbBlogs.filter(b => b.userId === id);
  const allLike = _cache2.default.get('BlogLike').filter(bl => bl.userId === id);
  const allComments = _cache2.default.get('BlogComment').filter(bc => bc.userId === id);
  const BlogPublish = allDbBlogs.filter(bp => bp.saveStatus === 'publish');
  // console.log('all blog data', Blog, allLike, allComments, BlogPublish);
  const allAssociateBlogsId = _lodash2.default.uniq([...allComments.map(obj => obj.blogId), ...allLike.map(obj => obj.blogId), ...Blog.map(obj => obj.id), ...BlogPublish.map(obj => obj.id)]);

  const blogDetails = allAssociateBlogsId.map(bid => (0, _api.findBlogDetail)(bid));
  const allBlogs = allAssociateBlogsId.map(bid => allDbBlogs.find(b => b.id === bid));
  // console.log('allBlogs', allBlogs);

  const newBlogPublish = BlogPublish.filter(b => !allBlogs.find(bn => b.id === bn.id));
  // const BlogDetail = blogDetails.map(obj => obj.blogDetail).flat();
  const BlogComment = (0, _flat2.default)(blogDetails.map(obj => obj.blogComment));
  const BlogLike = (0, _flat2.default)(blogDetails.map(obj => obj.blogLike));
  const allBlogUsers = [...allBlogs, ...newBlogPublish, ...BlogLike, ...BlogComment].map(b => b.userId);
  // console.log('allBlogUsers', asllBlogUsers);
  return { allBlogs, newBlogPublish, BlogComment, BlogLike, allBlogUsers, allAssociateBlogsId };
};