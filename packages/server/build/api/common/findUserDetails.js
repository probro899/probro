'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('../../cache/database/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (uid, all, slug) => {
  const allDbUser = _cache2.default.get('User');
  const allDbUserDetail = _cache2.default.get('UserDetail');

  const user = allDbUser.find(u => u[slug ? 'slug' : 'id'] === uid);
  const userDetail = allDbUserDetail.find(ud => ud.userId === user.id) || {};
  let userSkill = [];
  let userEducation = [];
  let userWorkExperience = [];
  let userPortal = [];
  if (all) {
    const allDbUserSkill = _cache2.default.get('UserSkill');
    const allDbEducation = _cache2.default.get('UserEducation');
    const allDbWorkExperience = _cache2.default.get('UserWorkExperience');
    const allDbUserPortal = _cache2.default.get('UserPortal');
    // console.log('allUserSkill', allDbUserSkill);
    userSkill = allDbUserSkill.filter(uk => uk.userId === user.id);
    userEducation = allDbEducation.filter(ue => ue.userId === user.id);
    userWorkExperience = allDbWorkExperience.filter(we => we.userId === user.id);
    userPortal = allDbUserPortal.filter(up => up.userId === user.id);
  }
  return { user: { id: user.id, slug: user.slug, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName }, userDetail, userSkill, userEducation, userWorkExperience, userPortal };
};