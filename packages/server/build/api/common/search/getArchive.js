'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _db = require('../../../db');

var _db2 = _interopRequireDefault(_db);

var _findUserDetails = require('../findUserDetails');

var _findUserDetails2 = _interopRequireDefault(_findUserDetails);

var _getPopular = require('./getPopular');

var _getPopular2 = _interopRequireDefault(_getPopular);

var _flat = require('../../flat');

var _flat2 = _interopRequireDefault(_flat);

var _findBlogDetails = require('../findBlogDetails');

var _findBlogDetails2 = _interopRequireDefault(_findBlogDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async userId => {
  // console.log('User id in getArchive api', userId);
  const popularRes = await (0, _getPopular2.default)();
  if (!userId) {
    return { basedOnHistory: { blogs: popularRes.blogs }, popularOnPc: { blogs: popularRes.blogs, users: popularRes.users } };
  }

  const userDetails = await (0, _findUserDetails2.default)(userId, true, true);
  // console.log('User Detials', userDetails);
  const { country, field, address } = userDetails.userDetail;
  const skills = userDetails.userSkill[0] ? JSON.parse(userDetails.userSkill[0].skill) : null;
  const fields = field ? JSON.parse(field) : null;

  const keyArr = _lodash2.default.uniq((0, _flat2.default)([country, fields, address, skills].filter(d => d)).map(k => k.toLowerCase()));

  // console.log(keyArr);
  const mainRes = await _db2.default.execute(async ({ exec }) => {
    const allBlogPromises = [];
    keyArr.forEach(k => {
      allBlogPromises.push(exec(`SELECT * FROM Blog WHERE title LIKE '%${k}%' AND [saveStatus]=?`, ['publish']));
    });
    const allBlog = await Promise.all(allBlogPromises);
    const allBlogResult = (0, _flat2.default)(allBlog).map(b => b.id);
    // console.log('allBlog', allBlog, allBlogResult);
    const allBologDetailsPrmises = [];
    _lodash2.default.uniq(allBlogResult).forEach(id => allBologDetailsPrmises.push((0, _findBlogDetails2.default)(id, userId)));
    const allBlogDetails = await Promise.all(allBologDetailsPrmises);
    // console.log('all blog details', allBlogDetails);
    // const finalBlogDetals = allBlogResult.map((blog, idx) => ({ blog, ...allBlogDetails[idx] })) || [];
    return { blogs: allBlogDetails };
  });
  // console.log('Main Response', mainRes);
  const finalBlogsRes = mainRes.blogs.length > 0 ? mainRes.blogs : popularRes.blogs;
  return { basedOnHistory: { blogs: finalBlogsRes }, popularOnPc: { blogs: popularRes.blogs, users: popularRes.users } };
};