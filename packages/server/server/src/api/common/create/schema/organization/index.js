/* eslint-disable import/no-cycle */
import urlSlug from 'url-slug';
import add from '../../add';
import addInvitation from './addInvitaion';
import resendInvitation from './resendInvitation';
import addRequest from './addRequest';

async function addOrganization(record) {
  // console.log('add organization called', record);
  const { name } = record;
  const tempSlug = urlSlug(name);
  const slug = `${tempSlug}-${Date.now()}`;
  const { session } = this;
  const { user } = session.values;
  try {
    const res = await add.call(this, 'Organization', { ...record, timeStamp: Date.now(), slug });
    await add.call(this, 'OrganizationMember', { oId: res, uId: record.uId, type: 'admin', status: 'active', timeStamp: Date.now(), email: user.email });
    return { status: 200, id: res, slug };
  } catch (e) {
    console.error('Error in addOrganization', e);
    return { status: 201, error: 'Faild to add organization!' };
  }
}

async function addOrganizationMember(record) {
  // console.log('add organization member', record);
  try {
    const { session } = this;
    const { action } = record;
    delete record.action;
    if (action === 'invitation') {
      const res = await addInvitation(session, record);
      return res;
    }

    if (action === 'resendInvitation') {
      const res = await resendInvitation(session, record);
      return res;
    }

    if (action === 'request') {
      const res = await addRequest(session, record);
      return res;
    }
  } catch (e) {
    console.error('Error in addOrganizationMember', e);
    throw e;
  }
}

export default [
  addOrganization,
  addOrganizationMember,
];
