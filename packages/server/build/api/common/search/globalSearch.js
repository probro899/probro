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

var _getPopular = require('./getPopular');

var _getPopular2 = _interopRequireDefault(_getPopular);

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

// Todo make baninary tree for searching it is expensive for now it is ok

exports.default = async (keyword, country, industry) => {
  // console.log('search keyword in search api', keyword, country, industry);
  const keywordArrtemp = keyword.split(' ');
  // console.log('all keyword', keywordArrtemp);
  const keywordArr = keywordArrtemp.filter(key => key.length > 0);
  // console.log('keywordArr', keywordArr);
  let finalBlogDetals = [];
  const res = await _db2.default.execute(async ({ exec }) => {
    if (!country && !industry) {
      const allBlogResult = await exec(`SELECT * FROM Blog WHERE title LIKE '%${keyword}%' AND [saveStatus]=?`, ['publish']);
      const allBologDetailsPrmises = [];
      allBlogResult.forEach(b => allBologDetailsPrmises.push((0, _findBlogDetails2.default)(b.id, b.userId)));
      const allBlogDetails = await Promise.all(allBologDetailsPrmises);
      finalBlogDetals = allBlogResult.map((blog, idx) => _extends({ blog }, allBlogDetails[idx])) || [];
    }

    // console.log('Search Resuslt for Blog', allBlogResult);
    const allUserResultPromises = [];
    const userDetailsPromises = [];
    const userSkillPromises = [];
    const userCarrierInterestPromises = [];
    const userDetailCountryPromises = [];

    if (industry) {
      userCarrierInterestPromises.push(exec(`SELECT * FROM UserSkill WHERE skill LIKE '%${industry}%'`, []));
      userCarrierInterestPromises.push(exec(`SELECT * FROM UserCarrierInterest WHERE interest LIKE '%${industry}%'`, []));
    }

    if (country) {
      userDetailCountryPromises.push(exec(`SELECT * FROM UserDetail WHERE country LIKE '%${country}'`, []));
    }

    keywordArr.forEach(k => {
      allUserResultPromises.push(exec(`SELECT firstName, id, lastName, middleName, email FROM User WHERE (firstName || lastName) LIKE '%${k}%'`, []));
      userDetailsPromises.push(exec(`SELECT * FROM UserDetail WHERE address LIKE '%${k}%'`, []));
      userDetailsPromises.push(exec(`SELECT * FROM UserDetail WHERE country LIKE '%${k}%'`, []));
      userSkillPromises.push(exec(`SELECT * FROM UserSkill WHERE skill LIKE '%${k}%'`, []));
    });

    const userResult = await Promise.all(allUserResultPromises);
    // console.log('userResult', userResult);
    const userDetailsResult = await Promise.all(userDetailsPromises);
    // console.log('userDetail', userDetailsResult);
    const userSkillResult = await Promise.all(userSkillPromises);
    // console.log('userSkill', userSkillResult);

    const userCarrierInterestResult = await Promise.all(userCarrierInterestPromises);

    const userDetailCountryResult = await Promise.all(userDetailCountryPromises);

    const keywordUsers = _lodash2.default.uniq([...flat(userResult).map(u => u.id), ...flat(userDetailsResult).map(u => u.userId), ...flat(userSkillResult).map(u => u.userId)]);

    // console.log('keyword User list', keywordUsers, userCarrierInterestResult);
    // console.log('All uniq user', uniqUsers);
    const uniqueCarrierInterestUsers = _lodash2.default.uniq(flat(userCarrierInterestResult).map(u => u.userId));
    const uniqueCountryUsers = _lodash2.default.uniq(flat(userDetailCountryResult).map(u => u.userId));
    // console.log('uniqueCarrier', uniqueCarrierInterestUsers, 'unique country', uniqueCountryUsers);
    let countryAndIndustryUserList = [];
    if (country && industry) {
      countryAndIndustryUserList = _lodash2.default.uniq([...uniqueCarrierInterestUsers, ...uniqueCountryUsers]).filter(uid => uniqueCountryUsers.find(cid => cid === uid && uniqueCarrierInterestUsers.find(id => id === uid)));
    } else {
      countryAndIndustryUserList = _lodash2.default.uniq([...uniqueCarrierInterestUsers, ...uniqueCountryUsers]);
    }

    const filterUserList = [];

    countryAndIndustryUserList.forEach(uid => {
      filterUserList.push(keywordUsers.find(id => id === uid));
    });

    const finalUserListPromises = [];
    let finalUsers = filterUserList;
    if (country || industry) {
      finalUsers = filterUserList;
    } else {
      finalUsers = keywordUsers;
    }

    if (keywordUsers.length === 0) {
      finalUsers = countryAndIndustryUserList;
    }

    // console.log('final user list', finalUsers, countryAndIndustryUserList);
    finalUsers.filter(u => u).forEach(id => finalUserListPromises.push((0, _findUserDetails2.default)(id, 'all')));
    const finalUserList = await Promise.all(finalUserListPromises);
    let allUserResult = [];
    let allBlogResult = [];

    if (finalUserList.length > 0) {
      allUserResult = finalUserList;
    } else {
      const popular = await (0, _getPopular2.default)();
      allUserResult = popular.users;
    }

    if (finalBlogDetals.length > 0) {
      allBlogResult = finalBlogDetals;
    } else {
      const popular = await (0, _getPopular2.default)();
      allBlogResult = popular.blogs;
    }
    // console.log('final User Result', finalUserList);
    return { blogs: allBlogResult, users: finalUserList };
  });
  // console.log('search response', res);
  return res;
};