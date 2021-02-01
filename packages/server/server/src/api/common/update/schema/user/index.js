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
  // console.log('update User connection called', updateRes, record);
  if ((status === 'connected' || status === 'pending' || status === 'deleted') && updateRes) {
    const allDbUsers = databaseCache.get('User');
    let fUserDetail = {};
    let tUserDetail = {};
    const htmlStringValue = await mailBody();
    let emailObj = {};
    let notiData = {};
    if (status === 'pending') {
      const currentUserId = session.values.user.id;
      const fuserId = currentUserId;
      const tuserId = userId === currentUserId ? mId : userId;
      fUserDetail = allDbUsers.find(u => u.id === fuserId);
      tUserDetail = allDbUsers.find(u => u.id === tuserId);

      emailObj = {
        email: tUserDetail.email,
        html: htmlStringValue.friendRequestHtmlString(fUserDetail, tUserDetail),
        subject: `Friend request from ${fUserDetail.firstName} `,
      };

      notiData = {
        userId: tUserDetail.id,
        timeStamp: Date.now(),
        body: `You have friend request from ${fUserDetail.firstName}`,
        title: 'Friend request',
        type: 'user',
        typeId: fUserDetail.id,
        viewStatus: false,
        imageUrl: null,
      };

      const mainchannel = session.getChannel(`UserConnection-${mId}`);
      const remoteUserSession = mainchannel.find(s => s.values.user.id === tUserDetail.id);
      if (remoteUserSession) {
        sendNotification(this, emailObj, notiData, [remoteUserSession]);
        const dataTobeUpdateConnection = {
          UserConnection: { id, status, mId, userId },
        };
        updateUserCache(dataTobeUpdateConnection, remoteUserSession, 'update');
      } else {
        sendNotification(this, emailObj, notiData);
      }
    } else {
      const currentUserId = session.values.user.id;
      const fuserId = currentUserId;
      const tuserId = userId === currentUserId ? mId : userId;
      fUserDetail = allDbUsers.find(u => u.id === fuserId);
      tUserDetail = allDbUsers.find(u => u.id === tuserId);
      // console.log('fuserDetails and tUserDetail', fUserDetail, tUserDetail, status);
      emailObj = {
        email: tUserDetail.email,
        html: htmlStringValue.friendRequestAcceptHtmlString(tUserDetail, fUserDetail),
        subject: `${fUserDetail.firstName} accept your friend request`,
      };

      notiData = {
        userId: tUserDetail.id,
        timeStamp: Date.now(),
        body: `${fUserDetail.firstName} accept your friend request`,
        title: 'Friend request',
        type: 'user',
        typeId: fUserDetail.id,
        viewStatus: false,
        imageUrl: null,
      };
      const mainchannel = session.getChannel(`UserConnection-${mId}`);
      const remoteUserSession = mainchannel.find(s => s.values.user.id === tUserDetail.id);
      if (remoteUserSession) {
        if (status !== 'deleted') {
          sendNotification(this, emailObj, notiData, [remoteUserSession]);
        }
        const dataTobeUpdateConnection = {
          UserConnection: { id, status },
        };
        updateUserCache(dataTobeUpdateConnection, remoteUserSession, 'update');
      } else {
        sendNotification(this, emailObj, notiData);
      }
    }

    session.subscribe(`UserConnection-${tUserDetail.id}`);
    session.subscribe(`UserConnection-${fUserDetail.id}`);
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
