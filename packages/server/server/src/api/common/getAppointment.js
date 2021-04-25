import databaseCache from '../../cache/database/cache';

export default (classId, userId) => {
  const res = databaseCache.get('Appointment').filter(a => a.classId === classId);
  return res;
};
