/* eslint-disable import/no-cycle */
import databaseCache from '../../../../../cache/database/cache';
import update from '../../../update/update';

export default async (context, record) => {
  // console.log('DeleteAccordingToActionType', record);
  try {
    const { action, orgId, ids } = record;
    const { session } = context;
    if (action === 'orgDelete') {
      const userId = session.values.user.id;
      const memberType = databaseCache.get('OrganizationMember').find(om => om.uId === userId && om.oId === orgId);
      const isAuthorize = memberType.type === 'admin';
      if (isAuthorize) {
        const updatePromises = [];
        ids.forEach(i => updatePromises.push(update.call(context, 'Board', { deleteStatus: true, broadCastId: `Board-${i}` }, { id: i })));
        await Promise.all(updatePromises);
        return { status: 200, data: 'Delete Successfull' };
      }
      return { status: 201, data: 'UnAuthorize access' };
    }
  } catch {
    return { status: 201, data: 'Delete faild' };
  }
};
