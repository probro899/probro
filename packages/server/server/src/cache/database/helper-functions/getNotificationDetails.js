import flat from '../../../api/flat';
import cacheDataBase from '../cache';

export default (id, boardDetails) => {
  // console.log('get notification', id);
  const allDbNotifications = cacheDataBase.get('Notification');
  const allDbNotificationsReadStatus = cacheDataBase.get('NotificationReadStatus');

  const boardNotifications = flat(boardDetails.allBoards.map(b => allDbNotifications.filter(n => n.boardId === b.id && n.type === 'board'))).filter(n => n.userId !== parseInt(id, 10));
  // console.log('all Board notification', flat(boardNotifications));
  const userNotification = allDbNotifications.filter(n => n.userId === id && n.type !== 'board');
  // console.log('board notifications', boardNotifications);
  const Notification = [...boardNotifications, ...userNotification];
  // const notificationReadStatusPrmises = [];
  // Notification.forEach(n => notificationReadStatusPrmises.push(find('NotificationReadStatus', { notifId: n.id })));

  const notificationReadStatus = Notification.map(n => allDbNotificationsReadStatus.filter(nrs => nrs.notifId === n.id));
  // console.log('all notfication', Notification);
  // console.log('all notification read status', notificationReadStatus);
  return { Notification, notificationReadstatus: flat(notificationReadStatus) };
};
