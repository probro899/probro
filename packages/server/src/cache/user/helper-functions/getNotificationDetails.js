import flat from '../../../api/flat';

export default async (find, id, boardDetails) => {
  const boardNotificationPromises = [];
  boardDetails.allBoards.forEach(b => boardNotificationPromises.push(find('Notification', { boardId: b.id, type: 'board' })));
  const boardNotifications = await Promise.all(boardNotificationPromises);
  // console.log('all Board notification', flat(boardNotifications));
  const userNotification = await find('Notification', { userId: id });
  const Notification = [...flat(boardNotifications), ...userNotification];
  const notificationReadStatusPrmises = [];
  Notification.forEach(n => notificationReadStatusPrmises.push(find('NotificationReadStatus', { notifId: n.id })));
  const notificationReadStatus = await Promise.all(notificationReadStatusPrmises);
  // console.log('all notfication', Notification);
  // console.log('all notification read status', notificationReadStatus);
  return { Notification, notificationReadstatus: flat(notificationReadStatus) };
};
