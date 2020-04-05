import databaseCache from '../../cache/database/cache';

export default async (uid, all, slug) => {
  const allDbUser = databaseCache.get('User');
  const allDbUserDetail = databaseCache.get('UserDetail');

  const user = allDbUser.find(u => u[slug ? 'slug' : 'id'] === uid);
  const userDetail = allDbUserDetail.find(ud => ud.userId === user.id) || {};
  let userSkill = [];
  let userEducation = [];
  let userWorkExperience = [];
  let userPortal = [];
  if (all) {
    const allDbUserSkill = databaseCache.get('UserSkill');
    const allDbEducation = databaseCache.get('UserEducation');
    const allDbWorkExperience = databaseCache.get('UserWorkExperience');
    const allDbUserPortal = databaseCache.get('UserPortal');
    // console.log('allUserSkill', allDbUserSkill);
    userSkill = allDbUserSkill.filter(uk => uk.userId === user.id);
    userEducation = allDbEducation.filter(ue => ue.userId === user.id);
    userWorkExperience = allDbWorkExperience.filter(we => we.userId === user.id);
    userPortal = allDbUserPortal.filter(up => up.userId === user.id);
  }
  return { user: { id: user.id, slug: user.slug, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName }, userDetail, userSkill, userEducation, userWorkExperience, userPortal };
};
