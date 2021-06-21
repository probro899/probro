/* eslint-disable import/no-cycle */
import sendNotification from '../../../sendNotification';
import cacheDatabase from '../../../../../cache/database/cache';
import mailBody from '../../../../../mailer/html/mailBody';
import siteConfig from '../../../../../../../webConfig.json';

export default async (session, record) => {
  // console.log('resendInvitation called', record);
  try {
    const { ids } = record;
    const allMemberRecords = ids.map(i => cacheDatabase.get('OrganizationMember').find(om => om.id === i));
    // email stuff for invitaion
    // console.log('All member record', allMemberRecords);
    allMemberRecords.forEach(async (om) => {
      const { email, oId, uId } = om;
      const organization = cacheDatabase.get('Organization').find(o => o.id === oId);

      const htmlStringValue = await mailBody();
      const emailObj = {
        email,
        html: htmlStringValue.boardNotificationHtml(
          `You have invitation from organization "${organization.name}"`,
          `Please follow the link to accept or decline the inivitation ${organization.name}.`,
          `${siteConfig.siteURL}/organization/${om.oId}/invitations`
        ),
        subject: `Organization inivitation from ${organization.name} `,
      };

      // notification stuff for invitation
      const user = cacheDatabase.get('User').find(u => u.id === uId);

      if (user) {
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
      } else {
        // send only email to user if user not yet login
        sendNotification(this, emailObj, null, null);
      }
    });

    return { status: 200, message: 'User resend inivited successfully' };
  } catch (e) {
    console.error('Error in resend invitation', e);
    return { status: 201, message: 'Resend invitaion faild' };
  }
};
