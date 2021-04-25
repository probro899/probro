/* eslint-disable import/no-cycle */
import mailBody from '../../../../../mailer/html/mailBody';
import findUserDetails from '../../../findUserDetails';
import updateUserCache from '../../../updateUserCache';
import add from '../../add';
import cacheDatabase from '../../../../../cache/database/cache';
import sendNotification from '../../../sendNotification';

async function connectUser(record) {
  try {
    const { session } = this;
    const connectRes = await add.call(this, 'UserConnection', record);
    const allDbUser = cacheDatabase.get('User');

    const { mId, userId } = record;
    const fUserDetails = allDbUser.find(u => u.id === userId);
    const tUserDetails = allDbUser.find(u => u.id === mId);
    const htmlStringValue = await mailBody();

    const emailObj = {
      email: tUserDetails.email,
      html: htmlStringValue.friendRequestHtmlString(fUserDetails, tUserDetails),
      subject: `Friend request from ${fUserDetails.firstName} `,
    };

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

    const mainchannel = session.getChannel('Main');
    const remoteUserSession = mainchannel.find(s => s.values.user.id === tUserDetails.id);
    if (remoteUserSession) {
      const fuserDetailsRes = await findUserDetails(fUserDetails.id);
      const dataToBeUpdate = {
        // Notification: notiDetails,
        UserConnection: { ...record, id: connectRes, user: fuserDetailsRes },
      };
      updateUserCache(dataToBeUpdate, remoteUserSession, 'add');
      sendNotification(this, emailObj, notiData, [remoteUserSession]);
    } else {
      sendNotification(this, emailObj, notiData);
    }

    const tuserDetailsRes = await findUserDetails(tUserDetails.id);
    const dataToBeUpdate = {
      UserConnection: { ...record, id: connectRes, user: tuserDetailsRes },
    };
    updateUserCache(dataToBeUpdate, session, 'update');
    session.subscribe(`UserConnection-${fUserDetails.id}`);
    session.subscribe(`UserConnection-${tUserDetails.id}`);
    return connectRes;
    } catch (e) {
      console.error('Error in connectUser', e);
    }
}
export default connectUser;
