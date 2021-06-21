/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import update from '../../update';
import getAppointment from '../../../getAppointment';
import db from '../../../../../db';
import addBoardActivity from '../../../addBoardActivity';

async function updateAppointment(params) {
  const { session } = this;
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'Appointment', { ...record, updatedAt: Date.now() }, condition);
  const { classId, userId } = res;
  const channel = session.channel(`Board-${classId}`);
  channel.dispatch(schema.update('Board', { id: parseInt(classId, 10), appointments: getAppointment(classId) }));
  addBoardActivity(this, db, { userId, boardId: classId, cardId: res, timeStamp: Date.now(), message: 'updateAppointment', notiOnly: true });
  return res;
}

export default [
  updateAppointment,
];
 