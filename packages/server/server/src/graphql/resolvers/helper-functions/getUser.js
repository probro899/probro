import findUserDetails from '../../../api/common/findUserDetails';

export default function getUser(variables) {
  const findUserDetailsRes = findUserDetails(variables.userSlug, true, variables.userSlug);
  return {
    ...findUserDetailsRes.user,
    userDetail: findUserDetailsRes.userDetail || {},
    userCarrierInterest: findUserDetailsRes.userCarrierInterest,
    userSkill: findUserDetailsRes.userSkill,
    userEducation: findUserDetailsRes.userEducation,
    userWorkExperience: findUserDetailsRes.userWorkExperience,
  };
}
