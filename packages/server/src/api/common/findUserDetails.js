import db from '../../db';

export default async (uid, all, slug) => {
  const res = await db.execute(async ({ find, findOne }) => {
    const user = await findOne('User', { [slug ? 'slug' : 'id']: uid });
    const userDetail = await findOne('UserDetail', { userId: user.id }) || {};
    let userSkill = [];
    let userEducation = [];
    let userWorkExperience = [];
    let userPortal = [];
    if (all) {
      userSkill = await find('UserSkill', { userId: user.id }) || [];
      userEducation = await find('UserEducation', { userId: user.id });
      userWorkExperience = await find('UserWorkExperience', { userId: user.id });
      userPortal = await find('UserPortal', { userId: user.id });
    }
    return { user: { id: user.id, slug: user.slug, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName }, userDetail, userSkill, userEducation, userWorkExperience, userPortal };
  });
  return res;
};
