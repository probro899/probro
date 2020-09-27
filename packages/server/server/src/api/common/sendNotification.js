/* eslint-disable import/no-cycle */
import mailer from '../../mailer';
import updateUserCache from './updateUserCache';
import add from './create/add';
import findUserDetails from './findUserDetails';
import databaseCache from '../../cache/database/cache';

export default async (context, emailObj, notiObj, sessions) => {
  // console.log('send notificaiton called');
  try {
    const { html, subject } = emailObj;
    const notiId = await add.call(context, 'Notification', notiObj);
    let dataTobeupdateAllUser;
    if (notiObj.type === 'user') {
      dataTobeupdateAllUser = {
        Notification: { id: notiId, ...notiObj, user: findUserDetails(notiObj.typeId) },
      };
    }

    if (notiObj.type === 'board') {
      const board = databaseCache.get('Board').find(b => b.id === notiObj.boardId);
      dataTobeupdateAllUser = {
        Notification: { id: notiId, ...notiObj, board },
      };
    }

    if (notiObj.type === 'blog') {
      const blog = databaseCache.get('Blog').find(b => b.id === notiObj.boardId);
      dataTobeupdateAllUser = {
        Notification: { id: notiId, ...notiObj, blog, user: findUserDetails(notiObj.typeId) },
      };
    }

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
