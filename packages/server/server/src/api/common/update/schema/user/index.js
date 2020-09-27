/* eslint-disable import/no-cycle */
import update from '../../update';
import mailBody from '../../../../../mailer/html/mailBody';
import updateUserCache from '../../../updateUserCache';
import sendNotification from '../../../sendNotification';
import databaseCache from '../../../../../cache/database/cache';

async function updateUser(record) {
  const { session } = this;
  const res = await update.call(this, 'User', ...record);
  const datatobeUpdate = {
    User: res,
  };
  updateUserCache(datatobeUpdate, session, 'update');
}

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
    const allDbUsers = databaseCache.get('User');
    const fUserDetails = allDbUsers.find(u => u.id === userId);
    const tUserDetails = allDbUsers.find(u => u.id === mId);
    const htmlStringValue = await mailBody();

    const emailObj = {
      email: fUserDetails.email,
      html: htmlStringValue.friendRequestAcceptHtmlString(fUserDetails, tUserDetails),
      subject: `${tUserDetails.firstName} accept your friend request`,
    };

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

    const mainchannel = session.getChannel(`UserConnection-${mId}`);
    const remoteUserSession = mainchannel.find(s => s.values.user.id === fUserDetails.id);
    if (remoteUserSession) {
      sendNotification(this, emailObj, notiData, [remoteUserSession]);
      const dataTobeUpdateConnection = {
        UserConnection: { id, status },
      };
      updateUserCache(dataTobeUpdateConnection, remoteUserSession, 'update');
    }
    session.subscribe(`UserConnection-${fUserDetails.id}`);
    session.subscribe(`UserConnection-${tUserDetails.id}`);
  }
  return updateRes;
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
  updateUser,
];
