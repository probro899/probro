/* eslint-disable import/no-cycle */
import mailBody from '../../../../../mailer/html/mailBody';
import mailer from '../../../../../mailer';
import findUserDetails from '../../../findUserDetails';
import updateUserCache from '../../../updateUserCache';
import add from '../../add';
import cacheDatabase from '../../../../../cache/database/cache';

async function connectUser(record) {
  const { session } = this;
  // console.log('record in conectUser', record);

  const connectRes = await add.call(this, 'UserConnection', record);
  // console.log('User Connection Res', connectRes);
  const allDbUser = cacheDatabase.get('User');

  const { mId, userId } = record;
  const fUserDetails = allDbUser.find(u => u.id === userId);
  const tUserDetails = allDbUser.find(u => u.id === mId);

  // console.log('from user', fUserDetails, 'to user', tUserDetails);
  const htmlStringValue = await mailBody();

  mailer({
    from: 'ProperClass<probro899@gmail.com>',
    to: `<${tUserDetails.email}>`,
    subject: `Friend request from ${fUserDetails.firstName} `,
    text: 'No reply',
    html: htmlStringValue.friendRequestHtmlString(fUserDetails, tUserDetails),
  });

  const notiData = {
    userId: tUserDetails.id,
    timeStamp: Date.now(),
    body: `You have friend request from ${fUserDetails.firstName}`,
    title: 'Friend request',
    type: 'user',
    typeId: fUserDetails.id,
    viewStatus: false,
    imageUrl: null,
  };

  const notiId = await add.call(this, 'Notification', notiData);
  const notiDetails = { id: notiId, ...notiData };
  const mainchannel = session.getChannel('Main');
  const remoteUserSession = mainchannel.find(s => s.values.user.id === tUserDetails.id);
  // console.log('remote User session', remoteUserSession);
  if (remoteUserSession) {
    const fuserDetailsRes = await findUserDetails(fUserDetails.id, true);
    const dataToBeUpdate = {
      User: fuserDetailsRes.user,
      UserDetail: fuserDetailsRes.userDetail,
      UserSkill: fuserDetailsRes.userSkill,
      UserEducation: fuserDetailsRes.userEducation,
      UserWorkExperience: fuserDetailsRes.userWorkExperience,
      UserPortal: fuserDetailsRes.userPortal,
      Notification: notiDetails,
      UserConnection: { ...record, id: connectRes },
    };
    updateUserCache(dataToBeUpdate, remoteUserSession, 'add');
  }
  const tuserDetailsRes = await findUserDetails(tUserDetails.id, true);
  const dataToBeUpdate = {
    User: tuserDetailsRes.user,
    UserDetail: tuserDetailsRes.userDetail,
    UserSkill: tuserDetailsRes.userSkill,
    UserEducation: tuserDetailsRes.userEducation,
    UserWorkExperience: tuserDetailsRes.userWorkExperience,
    UserPortal: tuserDetailsRes.userPortal,
  };
  updateUserCache(dataToBeUpdate, session, 'add');
  session.subscribe(`UserConnection-${fUserDetails.id}`);
  session.subscribe(`UserConnection-${tUserDetails.id}`);
  return connectRes;
}
export default connectUser;
