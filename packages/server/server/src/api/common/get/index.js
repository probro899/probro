import getBoardAPI from './schema/board';
import messageAPI from './message';
import getNotifications from './notification/getNotificationDetails';
import getUserCourse from './schema/course/getUserCourse';
import getCourseDetails from './schema/course/getCourseDetails';

export default [
  ...getBoardAPI,
  ...messageAPI,
  getNotifications,
  getUserCourse,
  getCourseDetails,
];
