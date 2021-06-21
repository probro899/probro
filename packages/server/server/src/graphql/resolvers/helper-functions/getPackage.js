import databaseCache from '../../../cache/database/cache';
import validateToken from '../../../auth/validateToken';

export default (params) => {
  const { sessionId, orgId } = params;
  let userId = null;
  if (sessionId) {
    const user = validateToken(sessionId);
    userId = user.id;
  }

  const individualSubscription = databaseCache.get('SellPackage').filter(s => s.uId === userId && s.type === 'individual');
  const organizationalSubscription = databaseCache.get('SellPackage').filter(s => s.oId === orgId && s.type === 'organization');
  let packages = databaseCache.get('Package');
  packages = packages.map((p) => {
    const isSubscribe = p.type === 'Individual'
      ? individualSubscription.find(sp => parseInt(sp.packageId, 10) === p.id && sp.uId === userId)
      : organizationalSubscription.find(sp => parseInt(sp.packageId, 10) === p.id && sp.oId === orgId);
    return {
      ...p,
      packageDescription: databaseCache.get('PackageDescription').find(pd => pd.packageId === p.id),
      isSubscribe,
    };
  });
  return packages;
};
