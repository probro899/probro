/* eslint-disable import/no-cycle */
import update from '../../update';
import db from '../../../../../db';
import mailBody from '../../../../../mailer/html/mailBody';
import mailer from '../../../../../mailer';
import findUserDetails from '../../../findBlogDetails';
import updateUserCache from '../../../updateUserCache';

function updateUserWorkExperience(record) {
  update.call(this, 'UserWorkExperience', ...record);
}

function updateUserEducation(record) {
  update.call(this, 'UserEducation', ...record);
}

function updateUserSkill(record) {
  update.call(this, 'UserSkill', ...record);
}

function updateUserPortal(record) {
  update.call(this, 'UserPortal', ...record);
}

function updateUserMessage(record) {
  update.call(this, 'UserMessage', ...record);
}

async function updateUserConnection(record) {
  const { session } = this;
  const { status, mId, userId } = record[0];
  const { id } = record[1];
  const updateRes = await update.call(this, 'UserConnection', ...record);
  // console.log('update User connection called', updateRes, status, mId, userId);
  if (status === 'connected' && updateRes) {
    // console.log('inside of send notification', status, mId, userId);
    const bothUserDetails = await db.execute(async ({ findOne, insert }) => {
      const fUserDetails = await findOne('User', { id: userId });
      const tUserDetails = await findOne('User', { id: mId });
      const htmlStringValue = await mailBody();

      mailer({
        from: 'ProperClass<probro899@gmail.com>',
        to: `<${fUserDetails.email}>`,
        subject: `${tUserDetails.firstName} accept your friend request`,
        text: 'No reply',
        html: htmlStringValue.friendRequestAcceptHtmlString(fUserDetails, tUserDetails),
      });

      const notiData = {
        userId: fUserDetails.id,
        timeStamp: Date.now(),
        body: `${tUserDetails.firstName} accept your friend request`,
        title: 'Friend request',
        type: 'user',
        typeId: tUserDetails.id,
        viewStatus: false,
        imageUrl: null,
      };

      const notiId = await insert('Notification', notiData);
      const notiDetails = await findOne('Notification', { id: notiId });
      const mainchannel = session.getChannel(`UserConnection-${mId}`);
      const remoteUserSession = mainchannel.find(s => s.values.user.id === fUserDetails.id);
      // console.log('remote User session', remoteUserSession);
      if (remoteUserSession) {
        const dataToBeUpdateNoti = {
          Notification: notiDetails,
        };
        updateUserCache(dataToBeUpdateNoti, remoteUserSession, 'add');
        const dataTobeUpdateConnection = {
          UserConnection: { id, status },
        };
        updateUserCache(dataTobeUpdateConnection, remoteUserSession, 'update');
      }
      session.subscribe(`UserConnection-${fUserDetails.id}`);
      session.subscribe(`UserConnection-${tUserDetails.id}`);

      return updateRes;
    });
  }
}

function updateUserCarrierInterest(record) {
  update.call(this, 'UserCarrierInterest', record);
}

export default [
  updateUserEducation,
  updateUserWorkExperience,
  updateUserSkill,
  updateUserPortal,
  updateUserConnection,
  updateUserCarrierInterest,
  updateUserMessage,
];
