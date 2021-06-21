/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import databaseCache from '../../../../../cache/database/cache';
import Delete from '../../delete';
import getAppointment from '../../../getAppointment';
import db from '../../../../../db';
import addBoardActivity from '../../../addBoardActivity';

async function deleteAppointment(params) {
  const { session } = this;
  const appoinment = databaseCache.get('Appointment').find(a => a.id === params.id);
  const res = await Delete.call(this, 'Appointment', params);
  const { classId, userId } = appoinment;
  const channel = session.channel(`Board-${classId}`);
  channel.dispatch(schema.update('Board', { id: parseInt(classId, 10), appointments: getAppointment(classId) }));
  addBoardActivity(this, db, { userId, boardId: classId, cardId: res, timeStamp: Date.now(), message: 'deleteAppointment', notiOnly: true });
  return res;
}

export default [
  deleteAppointment,
];
