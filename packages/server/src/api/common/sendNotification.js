/* eslint-disable import/no-cycle */
import mailer from '../../mailer';
import updateUserCache from './updateUserCache';
import add from './create/add';

export default async (context, emailObj, notiObj, sessions) => {
  try {
    const { html, subject } = emailObj;
    const notiId = await add.call(context, 'Notification', notiObj);
    const dataTobeupdateAllUser = {
      Notification: { id: notiId, ...notiObj },
    };
    // notify all users
    sessions.forEach((s) => {
      updateUserCache(dataTobeupdateAllUser, s, 'add');
      mailer({
        from: 'ProperClass<probro899@gmail.com>',
        to: `<${s.values.user.email}>`,
        subject,
        text: 'No reply',
        html,
      });
    });
  } catch (e) {
    console.error('Error in notification', e);
  }
};
