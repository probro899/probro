import databaseCache from '../../../cache/database/cache';
import findUserDetails from '../../../api/common/findUserDetails';

export default (orgId) => {
  // console.log('Get org called', orgId);
  const organization = databaseCache.get('Organization').find(o => o.id === parseInt(orgId, 10));
  const OrganizationMembers = databaseCache.get('OrganizationMember').filter(om => om.oId === parseInt(orgId, 10));
  const organizationMemerWithDetails = OrganizationMembers.slice(0, 10).map((om) => {
  const user = findUserDetails(om.uId);
    return ({ ...om, userDetails: { ...user.user, userDetail: user.userDetail } });
  });
  return {
    ...organization,
    members: organizationMemerWithDetails,
    noOfMembers: OrganizationMembers.length,
  };
};
