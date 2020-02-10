'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (find, findOne, id, userConnectionListDetails, blogDetails, boardDetails) => {
  const UserWorkExperience = await find('UserWorkExperience', { userId: id });
  const UserEducation = await find('UserEducation', { userId: id });
  const UserSkill = await find('UserSkill', { userId: id });
  const UserPortal = await find('UserPortal', { userId: id });
  const UserCarrierInterest = await find('UserCarrierInterest', { userId: id });
  const allBoardUserPromises = [];
  _lodash2.default.uniq([...boardDetails.allBoardUserList, ...userConnectionListDetails.allConnectionUserList, ...blogDetails.allBlogUsers, id]).forEach(uid => allBoardUserPromises.push(findOne('User', { id: uid })));
  const allUserList = await Promise.all(allBoardUserPromises);

  const boardUserDetailsPromises = [];
  _lodash2.default.uniq([...boardDetails.allBoardUserList, ...userConnectionListDetails.allConnectionUserList, ...blogDetails.allBlogUsers, id]).forEach(uid => boardUserDetailsPromises.push(findOne('UserDetail', { userId: uid })));
  const allUserDetailsList = (await Promise.all(boardUserDetailsPromises)).filter(obj => obj);
  // console.log('all user details list', allUserDetailsList);
  const allUser = allUserList.map(u => ({ id: u.id, firstName: u.firstName, email: u.email, lastName: u.lastName, slug: u.slug, activeStatus: null }));
  return { UserCarrierInterest, UserEducation, UserPortal, UserSkill, UserWorkExperience, allUser, allUserDetailsList };
};