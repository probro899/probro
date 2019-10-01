'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _db = require('../../../db');

var _db2 = _interopRequireDefault(_db);

var _findUserDetails = require('../findUserDetails');

var _findUserDetails2 = _interopRequireDefault(_findUserDetails);

var _findBlogDetails = require('../findBlogDetails');

var _findBlogDetails2 = _interopRequireDefault(_findBlogDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flat = arr => {
  const flatArray = arr.reduce((t, a) => {
    if (Array.isArray(a)) {
      a.forEach(am => t.push(am));
    } else {
      t.push(a);
    }
    return t;
  }, []);
  return flatArray;
};

exports.default = async keyword => {
  console.log('search keyword in search api', keyword);
  const keywordArrtemp = keyword.split(' ');
  // console.log('all keyword', keywordArrtemp);
  const keywordArr = keywordArrtemp.filter(key => key.length > 0);
  // console.log('keywordArr', keywordArr);
  const res = await _db2.default.execute(async ({ exec }) => {
    const allBlogResult = await exec(`SELECT * FROM Blog WHERE title LIKE '%${keyword}%' AND [saveStatus]=?`, ['publish']);
    const allBologDetailsPrmises = [];
    allBlogResult.forEach(b => allBologDetailsPrmises.push((0, _findBlogDetails2.default)(b.id, b.userId)));
    const allBlogDetails = await Promise.all(allBologDetailsPrmises);
    const finalBlogDetals = allBlogResult.map((blog, idx) => _extends({ blog }, allBlogDetails[idx]));
    // console.log('Search Resuslt for Blog', allBlogResult);
    const allUserResultPromises = [];
    const userDetailsPromises = [];
    const userSkillPromises = [];
    keywordArr.forEach(k => {
      allUserResultPromises.push(exec(`SELECT firstName, id, lastName, middleName, email FROM User WHERE (firstName || lastName) LIKE '%${k}%'`, []));
      userDetailsPromises.push(exec(`SELECT * FROM UserDetail WHERE address LIKE '%${k}'`, []));
      userSkillPromises.push(exec(`SELECT * FROM UserSkill WHERE skill LIKE '%${k}'`, []));
    });
    const userResult = await Promise.all(allUserResultPromises);
    // console.log('userResult', userResult);
    const userDetailsResult = await Promise.all(userDetailsPromises);
    // console.log('userDetail', userDetailsResult);
    const userSkillResult = await Promise.all(userSkillPromises);
    // console.log('userSkill', userSkillResult);

    const uniqUsers = _lodash2.default.uniq([...flat(userResult).map(u => u.id), ...flat(userDetailsResult).map(u => u.userId), ...flat(userSkillResult).map(u => u.userId)]);
    // console.log('All uniq user', uniqUsers);

    const finalUserListPromises = [];
    uniqUsers.forEach(id => finalUserListPromises.push((0, _findUserDetails2.default)(id, 'all')));
    const finalUserList = await Promise.all(finalUserListPromises);

    // console.log('final User Result', finalUserList);
    return { blogs: finalBlogDetals, users: finalUserList };
  });
  console.log('search response', res);
  return res;
};