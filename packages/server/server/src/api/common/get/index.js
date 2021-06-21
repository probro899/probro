import getBoardAPI from './schema/board';
import messageAPI from './message';
import getNotifications from './notification/getNotificationDetails';
import getUserCourse from './schema/course/getUserCourse';
import getCourseDetails from './schema/course/getCourseDetails';
import getAppointments from './schema/appointment/getAppointments';
import getOrganizations from './schema/organization/getOrganizations';
import getBlogRelatedApis from './schema/blog';

export default [
  ...getBoardAPI,
  ...messageAPI,
  ...getBlogRelatedApis,
  getNotifications,
  getUserCourse,
  getCourseDetails,
  getAppointments,
  getOrganizations,
];
