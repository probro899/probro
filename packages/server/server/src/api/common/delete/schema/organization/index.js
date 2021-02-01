import update from '../../../update/update';
import databaseCache from '../../../../../cache/database/cache';

async function deleteOrganization(record) {
  const { session } = this;
  // console.log('delete board called', record);
  const isYourOrganization = session.values.user.id === databaseCache.get('Organization').find(b => b.id === parseInt(record.id, 10)).uId;
  if (isYourOrganization) {
    const res = await update.call(this, 'Organization', { deleteStatus: true }, { id: record.id });
    return res;
  }
  return 'Unauthorize access';
}

async function deleteOrganizationMember(record) {
  const { session } = this;
  const isYourOrganization = session.values.user.id === databaseCache.get('Organization').find(b => b.id === parseInt(record.id, 10)).uId;
  if (isYourOrganization) {
    const res = await update.call(this, 'OrganizationMember', { deleteStatus: true }, { id: record.id });
    return res;
  }
  return 'Unauthorize access';
}

export default [
  deleteOrganization,
  deleteOrganizationMember,
];
