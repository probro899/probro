'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (id, userConnectionListDetails, blogDetails, boardDetails) => {
  const allDbUsers = _cache2.default.get('User');
  const allDbUserDetail = _cache2.default.get('UserDetail');
  const allDbWorkExperience = _cache2.default.get('UserWorkExperience');
  const allDbUserEducation = _cache2.default.get('UserEducation');
  const allDbUserSkill = _cache2.default.get('UserSkill');
  const allDbUserPortal = _cache2.default.get('UserPortal');
  const allDbUserCarrierInterest = _cache2.default.get('UserCarrierInterest');

  const UserWorkExperience = allDbWorkExperience.filter(d => d.userId === id);
  const UserEducation = allDbUserEducation.filter(d => d.userId === id);
  const UserSkill = allDbUserSkill.filter(d => d.userId === id);
  const UserPortal = allDbUserPortal.filter(d => d.userId === id);
  const UserCarrierInterest = allDbUserCarrierInterest.filter(d => d.userId === id);
  // console.log('allDbUserDetial', allDbUserDetail);
  const allUserDetailsList = _lodash2.default.uniq([...boardDetails.allBoardUserList, ...userConnectionListDetails.allConnectionUserList, ...blogDetails.allBlogUsers, id]).map(uid => allDbUserDetail.find(u => u.userId === uid)).filter(obj => obj);
  // console.log('all user details list', allUserDetailsList);
  const allUser = _lodash2.default.uniq([...boardDetails.allBoardUserList, ...userConnectionListDetails.allConnectionUserList, ...blogDetails.allBlogUsers, id]).map(uid => allDbUsers.find(u => u.id === uid)).map(u => ({ id: u.id, firstName: u.firstName, email: u.email, lastName: u.lastName, slug: u.slug, activeStatus: null }));
  return { UserCarrierInterest, UserEducation, UserPortal, UserSkill, UserWorkExperience, allUser, allUserDetailsList };
};