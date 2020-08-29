'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _db = require('../../../db');

var _db2 = _interopRequireDefault(_db);

var _findBlogDetails = require('../findBlogDetails');

var _findBlogDetails2 = _interopRequireDefault(_findBlogDetails);

var _findUserDetails = require('../findUserDetails');

var _findUserDetails2 = _interopRequireDefault(_findUserDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Todo make baninary tree for searching it is expensive for now it is ok

exports.default = async () => {
  const dataRes = await _db2.default.execute(async ({ find }) => {
    const publishBlogs = await find('Blog', { saveStatus: 'publish' });
    const allBlogDetailPromises = [];
    publishBlogs.forEach(b => allBlogDetailPromises.push((0, _findBlogDetails2.default)(b.id, b.userId)));
    const allBlogDetail = await Promise.all(allBlogDetailPromises);
    // console.log('allBlogDetail', allBlogDetail);
    const uniqBlogUserId = _lodash2.default.uniq(publishBlogs.map(b => b.userId));
    const createdBlogCount = [];
    uniqBlogUserId.forEach(id => {
      createdBlogCount.push(publishBlogs.filter(b => b.userId === id).length);
    });

    const blogs = publishBlogs.map((blog, idx) => _extends({}, allBlogDetail[idx], { blog })).sort((a, b) => {
      if (a.blogLike.length + a.blogComment > b.blogLike + b.blogComment) {
        return -1;
      }
      return 1;
    });

    // console.log('uniquser = ', uniqBlogUserId, 'createdBlogCount', createdBlogCount);
    const indexUserId = uniqBlogUserId.map((uid, idx) => ({ id: uid, count: createdBlogCount[idx] })).sort((a, b) => a > b ? 1 : -1).slice(0, 9);
    const allUserDetailsPromises = [];
    indexUserId.forEach(obj => allUserDetailsPromises.push((0, _findUserDetails2.default)(obj.id)));
    const allIndexUsers = await Promise.all(allUserDetailsPromises);
    // console.log('indexUserId', allIndexUsers);
    return { blogs: blogs || [], users: allIndexUsers };
  });
  // console.log('search response', dataRes);
  return dataRes;
};