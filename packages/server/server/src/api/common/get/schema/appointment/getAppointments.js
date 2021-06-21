import databaseCache from '../../../../../cache/database/cache';

export default async function getAppointments() {
  // console.log('get appointment called');
  const { session } = this;
  const userId = session.values.user.id;
  // console.log('userId', userId);
  const allUserAppointments = databaseCache.get('Appointment').filter(ap => ap.userId === userId && !ap.deleteStatus);
  const finalAppointment = allUserAppointments.map(a => ({ ...a, classDetail: databaseCache.get('Board').find(c => c.id === a.classId) }));
  // console.log('allAppointmensts to return', allUserAppointments);
  return finalAppointment;
}
