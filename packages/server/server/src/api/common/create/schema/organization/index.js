/* eslint-disable import/no-cycle */
import urlSlug from 'url-slug';
import add from '../../add';
import db from '../../../../../db';
import findUserDetails from '../../../findUserDetails';
import sendNotification from '../../../sendNotification';
import cacheDatabase from '../../../../../cache/database/cache';
import mailBody from '../../../../../mailer/html/mailBody';
import siteConfig from '../../../../../../../webConfig.json';

async function addOrganization(record) {
  // console.log('add organization called', record);
  const { name } = record;
  const tempSlug = urlSlug(name);
  const slug = `${tempSlug}-${Date.now()}`;
  const { session } = this;
  const { user } = session.values;
  try {
    const res = await add.call(this, 'Organization', { ...record, timeStamp: Date.now(), slug });
    await add.call(this, 'OrganizationMember', { oId: res, uId: record.uId, type: 'admin', status: 'accepted', timeStamp: Date.now(), email: user.email });
    return res;
  } catch (e) {
    console.error('Error in addOrganization', e);
  }
}

async function addOrganizationMember(record) {
  console.log('add organization member', record);
  try {
    const { session } = this;
    const { requestedFrom, email } = record;
    delete record.requestedFrom;
    delete record.email;

    const userStaus = await db.execute(async ({ findOne }) => {
      const hasUser = await findOne('User', { email }) || {};
      const isUserAllReadyExist = await findOne('OrganizationMember', { oId: record.oId, email });
      return { hasUser, isUserAllReadyExist };
    });

    if (userStaus.isUserAllReadyExist) {
      return { status: 201, message: 'User already invited.' };
    }
    const organization = cacheDatabase.get('Organization').find(og => og.id === record.oId);

    // email stuff for invitaion
    const htmlStringValue = await mailBody();
    const emailObj = {
      email,
      html: htmlStringValue.boardNotificationHtml(
        `You have invitation from organization "${organization.name}"`,
        `Please follow the link to accept or decline the inivitation ${organization.name}.`,
        `${siteConfig.siteURL}/organization/${record.oId}/invitations`
      ),
      subject: `Organization inivitation from ${organization.name} `,
    };
    const timeStamp = Date.now();
    if (userStaus.hasUser.id) {
      const { id } = userStaus.hasUser;
      const res = await add.call(this, 'OrganizationMember', { ...record, uId: id, timeStamp, email });

      // notification stuff for invitation
      const user = userStaus.hasUser;
      const notiObj = {
        userId: user.id,
        boardId: record.oId,
        timeStamp: Date.now(),
        body: `You have invitation from ${organization.name}`,
        title: 'Organization Invitation',
        type: 'organization',
        typeId: record.oId,
        viewStatus: false,
        imageUrl: null,
      };

      const mainchannel = session.getChannel('Main');
      const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
      if (remoteUserSession) {
        sendNotification(this, emailObj, notiObj, [remoteUserSession]);
      } else {
        sendNotification(this, emailObj, notiObj, null);
      }

      const resultRes = { id: res, user: findUserDetails(id), timeStamp, type: record.type, email };
      return { status: 200, message: 'Member added successfully', data: resultRes };
    }
    // sending only email to the user
    const omRes = await add.call(this, 'OrganizationMember', { ...record, uId: 0, timeStamp, email });
    sendNotification(this, emailObj, null, null);
    return { status: 200, message: 'User inivited successfully', data: { id: omRes, user: { user: { email } }, email, timeStamp, type: record.type } };
  } catch (e) {
    console.error('Error in addOrganizationMember', e);
    throw e;
  }
}

export default [
  addOrganization,
  addOrganizationMember,
];
