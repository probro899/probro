/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import add from '../../add';
import db from '../../../../../db';
import mailBody from '../../../../../mailer/html/mailBody';
import mailer from '../../../../../mailer';

async function addUserWorkExperience(record) {
  const res = await add.call(this, 'UserWorkExperience', record);
  return res;
}

async function addUserEducation(record) {
  const res = await add.call(this, 'UserEducation', record);
  return res;
}

async function addUserSkill(record) {
  const res = await add.call(this, 'UserSkill', record);
  return res;
}

async function addUserPortal(record) {
  const res = await add.call(this, 'UserPortal', record);
  return res;
}

async function addUserMessage(record) {
  const res = await add.call(this, 'UserMessage', record);
  return res;
}

async function addCarrierInterest(record) {
  const res = await add.call(this, 'UserCarrierInterest', record);
  return res;
}

async function connectUser(record) {
  const { session } = this;
  // console.log('record in conectUser', record);

  const connectRes = add.call(this, 'UserConnection', record);

  const { mId, userId } = record;
  const bothUserDetails = await db.execute(async ({ findOne, insert }) => {
    const fUserDetails = await findOne('User', { id: userId });
    const tUserDetails = await findOne('User', { id: mId });

    const htmlStringValue = await mailBody();

    mailer({
      from: 'ProperClass<probro899@gmail.com>',
      to: `<${tUserDetails.email}>`,
      subject: `Friend request from ${fUserDetails.firstName} `,
      text: 'No reply',
      html: htmlStringValue.boardMemberInvitationHtmlString(fUserDetails, tUserDetails),
    });

    const notiData = {
      userId: tUserDetails.id,
      timeStamp: Date.now(),
      body: `You have friend request from ${fUserDetails.firstName}`,
      title: 'Friend request',
      type: 'user',
      viewStatus: false,
      imageUrl: null,
    };

    const notiId = await insert('Notification', notiData);
    const notiDetails = await findOne('Notification', { id: notiId });
    const mainchannel = session.getChannel('Main');
    const remoteUserSession = mainchannel.find(s => s.values.user.id === tUserDetails.id);
    console.log('remote User session', remoteUserSession);
    if (remoteUserSession) {
      remoteUserSession.dispatch(schema.add('Notification', notiDetails));
    }
    return connectRes;
  });
}

export default [
  addUserWorkExperience,
  addUserEducation,
  addUserSkill,
  addUserPortal,
  addUserMessage,
  connectUser,
  addCarrierInterest,
];
