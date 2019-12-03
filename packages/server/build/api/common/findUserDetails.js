'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (uid, all) => {
  const res = await _db2.default.execute(async ({ find, findOne }) => {
    const user = await findOne('User', { id: uid });
    const userDetail = (await findOne('UserDetail', { userId: uid })) || {};
    let userSkill = [];
    let userEducation = [];
    let userWorkExperience = [];
    let userPortal = [];
    if (all) {
      userSkill = (await find('UserSkill', { userId: uid })) || [];
      userEducation = await find('UserEducation', { userId: uid });
      userWorkExperience = await find('UserWorkExperience', { userId: uid });
      userPortal = await find('UserPortal', { userId: uid });
    }
    return { user: { id: user.id, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName }, userDetail, userSkill, userEducation, userWorkExperience, userPortal };
  });
  return res;
};