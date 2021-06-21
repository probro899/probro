/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import add from '../../add';
import findUserDetails from '../../../findUserDetails';
import sendNotification from '../../../sendNotification';
import cacheDatabase from '../../../../../cache/database/cache';
import mailBody from '../../../../../mailer/html/mailBody';
import siteConfig from '../../../../../../../webConfig.json';

export default async (session, record) => {
  const { oId, uId, email } = record;
  const res = await add.call({ session }, 'OrganizationMember', { ...record, timeStamp: Date.now(), status: 'request' });
  const channel = session.channel(`Organization-${oId}`);
  channel.dispatch(schema.add('OrganizationMember', { id: res, ...record, timeStamp: Date.now(), status: 'request', user: uId ? findUserDetails(uId) : { user: { email: null } } }), null, session.values.user.id);

  const currentUser = findUserDetails(uId);
  const organization = cacheDatabase.get('Organization').find(og => og.id === record.oId);
  const { user } = currentUser;

  // email stuff for invitaion
  const htmlStringValue = await mailBody();
  const emailObj = {
    email,
    html: htmlStringValue.boardNotificationHtml(
      `Organization join request from ${user.firstName} ${user.lastName} in organization "${organization.name}"`,
      'Please follow the link to accept or decline the request',
      `${siteConfig.siteURL}`
    ),
    subject: `Organization Join Request from ${user.firstName} ${user.lastName} in organization "${organization.name}`,
  };

  // notification stuff for invitation
  const notiObj = {
    userId: user.id,
    boardId: record.oId,
    timeStamp: Date.now(),
    body: `Organization join request from ${user.firstName} ${user.lastName} in organization "${organization.name}`,
    title: 'Organization Request',
    type: 'organization',
    typeId: record.oId,
    viewStatus: false,
    imageUrl: null,
  };

  const allSessions = session.getChannel(`Organization-${oId}`);
  sendNotification(this, emailObj, notiObj, allSessions);
  return { status: 200, data: res };
};
