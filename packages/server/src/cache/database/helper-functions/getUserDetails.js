import lodash from 'lodash';
import cacheDatabase from '../cache';

export default (id, userConnectionListDetails, blogDetails, boardDetails) => {
  const allDbUsers = cacheDatabase.get('User');
  const allDbUserDetail = cacheDatabase.get('UserDetail');
  const allDbWorkExperience = cacheDatabase.get('UserWorkExperience');
  const allDbUserEducation = cacheDatabase.get('UserEducation');
  const allDbUserSkill = cacheDatabase.get('UserSkill');
  const allDbUserPortal = cacheDatabase.get('UserPortal');
  const allDbUserCarrierInterest = cacheDatabase.get('UserCarrierInterest');

  const UserWorkExperience = allDbWorkExperience.filter(d => d.userId === id);
  const UserEducation = allDbUserEducation.filter(d => d.userId === id);
  const UserSkill = allDbUserSkill.filter(d => d.userId === id);
  const UserPortal = allDbUserPortal.filter(d => d.userId === id);
  const UserCarrierInterest = allDbUserCarrierInterest.filter(d => d.userId === id);

  const allUserDetailsList = lodash.uniq([...boardDetails.allBoardUserList, ...userConnectionListDetails.allConnectionUserList, ...blogDetails.allBlogUsers, id]).map(uid => allDbUserDetail.find(u => u.userId === uid)).filter(obj => obj);
  // console.log('all user details list', allUserDetailsList);
  const allUser = lodash.uniq([
    ...boardDetails.allBoardUserList,
    ...userConnectionListDetails.allConnectionUserList,
    ...blogDetails.allBlogUsers,
    id,
  ]).map(uid => allDbUsers.find(u => u.id === uid)).map(u => ({ id: u.id, firstName: u.firstName, email: u.email, lastName: u.lastName, slug: u.slug, activeStatus: null }));
  return { UserCarrierInterest, UserEducation, UserPortal, UserSkill, UserWorkExperience, allUser, allUserDetailsList };
};
