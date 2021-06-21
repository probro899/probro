import database from '../../../../../cache/database/cache';
import flat from '../../../../flat';
import findBoardDetails from '../../../findBoradDetail';

export default (oId) => {
  const subscribedPackage = database.get('SellPackage').find(p => p.oId === oId);
  let packageDetail = {};
  if (subscribedPackage) {
    packageDetail = database.get('Package').find(p => p.id === parseInt(subscribedPackage.packageId, 10));
  }
  const totalClasses = database.get('Board').filter(b => b.oId === oId && !b.deleteStatus);
  const classMembers = flat(totalClasses.map(c => findBoardDetails(c.id).boardMember));
  return { subscriptionDetails: subscribedPackage ? { ...subscribedPackage, packageDetail } : null, classes: totalClasses, classMembers };
};
