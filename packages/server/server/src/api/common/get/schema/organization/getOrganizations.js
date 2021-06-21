import schema from '@probro/common/src/schema';
import databaseCache from '../../../../../cache/database/cache';
import flat from '../../../../flat';
import findUserDetails from '../../../findUserDetails';
import getOrganizationDetails from './getOrganizationDetails';

export default function getOrganizations(orgReqUserId) {
  let session = null;
  if (this) {
    session  = this.session;
  }

  const userId = orgReqUserId || session.values.user.id;
  // console.log('getOrganization called', orgReqUserId, userId);
  const currentUserDetails = findUserDetails(userId);
  const allAssociateOrganizationMembers = databaseCache.get('OrganizationMember').filter(om => om.email === currentUserDetails.user.email && !om.deleteStatus);

  const allRelatedOrganizations = allAssociateOrganizationMembers.map((om) => {
    const org = databaseCache.get('Organization').find(o => o.id === om.oId && !o.deleteStatus);
    if (org) {
      return {
        ...org,
        role: om.type,
      };
    }
    return null;
  }).filter(o => o);
  // console.log('All Related Organization', allRelatedOrganizations);
  if (orgReqUserId) {
    return allRelatedOrganizations;
  }

  let allOrganizationMembers = flat(allRelatedOrganizations.map((og) => {
    if (og.role === 'admin' || og.role === 'manager') {
      return databaseCache.get('OrganizationMember').filter(ozm => ozm.oId === og.id && !ozm.deleteStatus);
    }
    return [];
  }));

  allOrganizationMembers = allOrganizationMembers.map(obj => ({ ...obj, user: obj.uId ? findUserDetails(obj.uId) : { user: { email: null } } }));
  let classMembersTemp = [];
  const finalOrganizations = allRelatedOrganizations.map(o => {
    if (o.role === 'admin' || o.role === 'manager') {
      const { subscriptionDetails, classes, classMembers } = getOrganizationDetails(o.id);
      classMembersTemp = [...classMembersTemp, ...classMembers];
      return {
        ...o,
        classes,
        subscribedPackage: subscriptionDetails,
      };
    }
    return o;
  });

  session.dispatch(schema.add('Organization', finalOrganizations));
  session.dispatch(schema.add('OrganizationMember', allOrganizationMembers));
  session.dispatch(schema.add('BoardMember', classMembersTemp));
  return { status: 200, data: 'Data init success' };
}
