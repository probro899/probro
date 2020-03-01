import flat from '../../../api/flat';
import cacheDataBase from '../cache';

export default (id, boardDetails) => {
  const allDbNotifications = cacheDataBase.get('Notification');
  const allDbNotificationsReadStatus = cacheDataBase.get('NotificationReadStatus');

  const boardNotifications = boardDetails.allBoards.map(b => allDbNotifications.filter(n => n.boardId === b.id && n.type === 'board'));
  // console.log('all Board notification', flat(boardNotifications));
  const userNotification = allDbNotifications.filter(n => n.userId === id);
  const Notification = [...flat(boardNotifications), ...userNotification];
  // const notificationReadStatusPrmises = [];
  // Notification.forEach(n => notificationReadStatusPrmises.push(find('NotificationReadStatus', { notifId: n.id })));

  const notificationReadStatus = Notification.map(n => allDbNotificationsReadStatus.filter(nrs => nrs.notifId === n.id));
  // console.log('all notfication', Notification);
  // console.log('all notification read status', notificationReadStatus);
  return { Notification, notificationReadstatus: flat(notificationReadStatus) };
};
