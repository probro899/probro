import databaseCache from '../../../cache/database/cache';
import findUserDetails from '../../../api/common/findUserDetails';
import validateToken from '../../../auth/validateToken';

export default async (orgId, sessionId) => {
  // console.log('Get org called', orgId, sessionId);
  const organization = databaseCache.get('Organization').find(o => o.slug === orgId);

  let joinStatus = null;
  const OrganizationMembers = databaseCache.get('OrganizationMember').filter(om => om.oId === organization.id);
  if (sessionId) {
    const user = validateToken(sessionId);
    joinStatus = OrganizationMembers.find(om => om.email === user.email);
  }

  const organizationMemerWithDetails = OrganizationMembers.slice(0, 10).map((om) => {
    const user = findUserDetails(om.uId);
    return ({ ...om, userDetails: { ...user.user, userDetail: user.userDetail } });
  });

  return {
    ...organization,
    members: organizationMemerWithDetails,
    noOfMembers: OrganizationMembers.length,
    joinStatus,
  };
};
