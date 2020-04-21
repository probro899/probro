'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flat = require('../../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (id, boardDetails) => {
  const allDbNotifications = _cache2.default.get('Notification');
  const allDbNotificationsReadStatus = _cache2.default.get('NotificationReadStatus');

  const boardNotifications = boardDetails.allBoards.map(b => allDbNotifications.filter(n => n.boardId === b.id && n.type === 'board'));
  // console.log('all Board notification', flat(boardNotifications));
  const userNotification = allDbNotifications.filter(n => n.userId === id);
  const Notification = [...(0, _flat2.default)(boardNotifications), ...userNotification];
  // const notificationReadStatusPrmises = [];
  // Notification.forEach(n => notificationReadStatusPrmises.push(find('NotificationReadStatus', { notifId: n.id })));

  const notificationReadStatus = Notification.map(n => allDbNotificationsReadStatus.filter(nrs => nrs.notifId === n.id));
  // console.log('all notfication', Notification);
  // console.log('all notification read status', notificationReadStatus);
  return { Notification, notificationReadstatus: (0, _flat2.default)(notificationReadStatus) };
};