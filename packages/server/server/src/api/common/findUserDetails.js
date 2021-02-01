import databaseCache from '../../cache/database/cache';

export default (uid, all, slug) => {
  // console.log('find userDetails called', uid);
  // console.time('UserFetchTime');
  const allDbUser = databaseCache.get('User');
  const allDbUserDetail = databaseCache.get('UserDetail');
  const user = allDbUser.find(u => u[slug ? 'slug' : 'id'] === uid);
  const userDetail = allDbUserDetail.find(ud => ud.userId === user.id) || {};
  let userSkill = [];
  let userEducation = [];
  let userWorkExperience = [];
  let userPortal = [];
  let userCarrierInterest = [];
  if (all) {
    const allDbUserSkill = databaseCache.get('UserSkill');
    const allDbEducation = databaseCache.get('UserEducation');
    const allDbWorkExperience = databaseCache.get('UserWorkExperience');
    const allDbUserPortal = databaseCache.get('UserPortal');
    const allDbCarrierInterest = databaseCache.get('UserCarrierInterest');
    // console.log('allUserSkill', allDbUserSkill);
    userSkill = allDbUserSkill.filter(uk => uk.userId === user.id);
    userEducation = allDbEducation.filter(ue => ue.userId === user.id);
    userWorkExperience = allDbWorkExperience.filter(we => we.userId === user.id);
    userPortal = allDbUserPortal.filter(up => up.userId === user.id);
    userCarrierInterest = allDbCarrierInterest.filter(up => up.userId === user.id);
  }
  // console.timeEnd('UserFetchTime');
  return {
    user: {
      id: user.id,
      email: user.email,
      slug: user.slug,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      callId: user.callId,
    },
    userDetail: userDetail || {},
    userSkill,
    userEducation,
    userWorkExperience,
    userPortal,
    userCarrierInterest,
  };
};
