import add from '../../add';

async function addOrganization(record) {
  const res = await add.call(this, 'Organization', { ...record, timeStamp: Date.now() });
  return res;
}

async function addOrganizationMember(record) {
  const res = await add.call('OrganizationMember', { ...record, timeStamp: Date.now() });
  return res;
}

export default [
  addOrganization,
  addOrganizationMember,
];
