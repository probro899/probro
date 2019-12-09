import db from '../../db';

export default async (uid, all, slug) => {
  console.log('uid, all, slug', uid, all, slug);
  const res = await db.execute(async ({ find, findOne }) => {
    const user = await findOne('User', { [slug ? 'slug' : 'id']: uid });
    const userDetail = await findOne('UserDetail', { userId: user.id }) || {};
    let userSkill = [];
    let userEducation = [];
    let userWorkExperience = [];
    let userPortal = [];
    if (all) {
      userSkill = await find('UserSkill', { userId: uid }) || [];
      userEducation = await find('UserEducation', { userId: uid });
      userWorkExperience = await find('UserWorkExperience', { userId: uid });
      userPortal = await find('UserPortal', { userId: uid });
    }
    return { user: { id: user.id, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName }, userDetail, userSkill, userEducation, userWorkExperience, userPortal };
  });
  return res;
};
