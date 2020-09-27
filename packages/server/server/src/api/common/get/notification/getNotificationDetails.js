import flat from '../../../flat';
import cacheDataBase from '../../../../cache/database/cache';
import findUserDetails from '../../findUserDetails';

export default (id, allBoards) => {
  const allDbNotifications = cacheDataBase.get('Notification');
  const allDbNotificationsReadStatus = cacheDataBase.get('NotificationReadStatus');
  const allDbBlogs = cacheDataBase.get('Blog');
  // gettig all board notificatins
  const boardNotifications = flat(allBoards.map(b => allDbNotifications.filter(n => n.boardId === b.id && n.type === 'board'))).filter(n => n.userId !== parseInt(id, 10));
  const boardNotificationWithBoardDetail = boardNotifications.map(bn => ({ ...bn, board: allBoards.find(b => b.id === bn.boardId) }));
  // gettting all User Notificaiton
  const userNotification = allDbNotifications.filter(n => n.userId === id && n.type === 'user');
  const userNotificationWithUserDetail = userNotification.map(n => ({ ...n, user: findUserDetails(n.typeId) }));

  // getting all Blog Notification
  const blogNotification = allDbNotifications.filter(n => n.userId === id && n.type === 'blog');
  const blogNotificationWithUser = blogNotification.map(n => ({ ...n, user: findUserDetails(n.typeId), blog: allDbBlogs.find(b => b.id === n.boardId) }));

  // combining all
  const Notification = [...boardNotificationWithBoardDetail, ...userNotificationWithUserDetail, ...blogNotificationWithUser];

  // getting seen status of all Notifiction
  const notificationReadStatus = Notification.map(n => allDbNotificationsReadStatus.filter(nrs => nrs.notifId === n.id));

  return { Notification, notificationReadstatus: flat(notificationReadStatus) };
};
