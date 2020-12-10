import getBoardAPI from './schema/board';
import messageAPI from './message';
import getNotifications from './notification/getNotificationDetails';

export default [
  ...getBoardAPI,
  ...messageAPI,
  getNotifications,
];
