/* eslint-disable import/no-cycle */
import _ from 'lodash';
import update from '../../../update/update';
import Delete from '../../delete';
import databaseCache from '../../../../../cache/database/cache';

async function deleteOrganization(record) {
  try {
    const { session } = this;
    // console.log('delete board called', record);
    const isYourOrganization = session.values.user.id === databaseCache.get('Organization').find(b => b.id === parseInt(record.id, 10)).uId;
    if (isYourOrganization) {
      const res = await update.call(this, 'Organization', { deleteStatus: true }, { id: record.id });
      return res;
    }
    return 'Unauthorize access';
  } catch (e) {
    console.error('Error in deleteOrganization', e);
  }
}

async function deleteOrganizationMember(record) {
  // console.log('deleteOrganization Member', record);
  try {
    const { session } = this;
    const { ids, oId, action } = record;
    const userId = session.values.user.id;
    const memberRecord = databaseCache.get('OrganizationMember').find(om => om.uId === userId && om.oId === oId);
    const isAuthorize = memberRecord.type === 'admin';

    if (isAuthorize) {
      if (_.isArray(ids)) {
        if (action === 'delete') {
          const updatePromises = ids.map(i => Delete.call(this, 'OrganizationMember', { id: i }));
          await Promise.all(updatePromises);
          return {
            status: 200,
            data: 'Records deleted successffull',
          };
        }
        const updatePromises = ids.map(i => update.call(this, 'OrganizationMember', { deleteStatus: true }, { id: i }));
        await Promise.all(updatePromises);
        return {
          status: 200,
          data: 'Records deleted successffull',
        };
      }
      await update.call(this, 'OrganizationMember', { deleteStatus: true }, { id: record.id });
      return {
        status: 200,
        data: 'Record deleted successffull',
      };
    }
    return { status: 201, data: 'Unauthorize access' };
  } catch (e) {
    console.error('Error in deleteOrganizationMember', e);
    return { status: 201, data: 'Record delation faild' };
  }
}

export default [
  deleteOrganization,
  deleteOrganizationMember,
];
