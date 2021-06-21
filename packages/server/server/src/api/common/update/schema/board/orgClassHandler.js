/* eslint-disable import/no-cycle */
import databaseCache from '../../../../../cache/database/cache';
import update from '../../update';

export default async (context, record) => {
  console.log('orgClassHandler', record);
  try {
    const { action, orgId, ids, refCode } = record;
    const { session } = context;
    if (action === 'orgAcceptBoard') {
      const userId = session.values.user.id;
      const memberType = databaseCache.get('OrganizationMember').find(om => om.uId === userId && om.oId === orgId);
      const isAuthorize = memberType.type === 'admin';
      if (isAuthorize) {
        const updatePromises = [];
        // sellPackage ref code is for now is
        ids.forEach(i => updatePromises.push(update.call(context, 'Board', { refCode, broadCastId: `Board-${i}` }, { id: i })));
        await Promise.all(updatePromises);
        return { status: 200, data: 'Accept Successfull' };
      }
      return { status: 201, data: 'UnAuthorize access' };
    }
  } catch {
    return { status: 201, data: 'Accept faild' };
  }
};
