/* eslint-disable import/no-cycle */
import _ from 'lodash';
import databaseCache from '../../../../../cache/database/cache';
import update from '../../update';

async function updateOrganization(records) {
  const res = await update.call(this, 'Organization', ...records);
  return res;
}

async function updateOrganizationMember(record) {
  try {
    const { session } = this;
    const { ids, oId, status } = record;
    if (ids && status) {
      const userId = session.values.user.id;
      const memberRecord = databaseCache.get('OrganizationMember').find(om => om.uId === userId && om.oId === oId);
      const isAuthorize = memberRecord.type === 'admin';
      if (isAuthorize) {
        if (_.isArray(ids)) {
          const updatePromises = ids.map(i => update.call(this, 'OrganizationMember', { status }, { id: i }));
          await Promise.all(updatePromises);
          return {
            status: 200,
            data: 'Records updated successffull',
          };
        }
      } else {
        return { status: 201, data: 'Unauthorize access' };
      }
    }

    const res = await update.call(this, 'OrganizationMember', ...record);
    return res;
  } catch (e) {
    console.error('Error in deleteOrganizationMember', e);
    return { status: 201, data: 'Record updation faild' };
  }
}

export default [
  updateOrganization,
  updateOrganizationMember,
];
