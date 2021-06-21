import _ from 'lodash';
import databaseCache from '../../cache/database/cache';

export default (classId, userId) => {
  const res = databaseCache.get('Appointment').filter(a => a.classId === parseInt(classId, 10) && !a.deleteStatus);
  const finalAppointments = _.orderBy(res, ['startDate'], ['desc']);
  return finalAppointments;
};
