/* eslint-disable import/no-cycle */
import db from '../../../../../db';
import findUserDetails from '../../../findUserDetails';
import sendNotification from '../../../sendNotification';
import cacheDatabase from '../../../../../cache/database/cache';
import mailBody from '../../../../../mailer/html/mailBody';
import siteConfig from '../../../../../../../webConfig.json';
import add from '../../add';

export default async (session, record) => {
  // console.log('addInvitation called', record);
  const { email } = record;
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
      `${siteConfig.siteURL}/organization/${organization.slug}`
    ),
    subject: `Organization inivitation from ${organization.name} `,
  };
  const timeStamp = Date.now();
  if (userStaus.hasUser.id) {
    const { id } = userStaus.hasUser;
    const res = await add.call(this, 'OrganizationMember', { ...record, uId: id, timeStamp, email, status: 'invitation' });

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

    const resultRes = { id: res, user: findUserDetails(id), timeStamp, type: record.type, email, status: 'invitation' };
    return { status: 200, message: 'Member added successfully', data: resultRes };
  }
  // sending only email to the user
  const omRes = await add.call(this, 'OrganizationMember', { ...record, uId: 0, timeStamp, email, status: 'invitation' });
  sendNotification(this, emailObj, null, null);
  return { status: 200, message: 'User inivited successfully', data: { id: omRes, user: { user: { email } }, email, timeStamp, type: record.type, status: 'invitation' } };
}