/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import add from '../../add';
import db from '../../../../../db';
import getAppointment from '../../../getAppointment';
import addBoardActivity from '../../../addBoardActivity';

async function addAppointment(params) {
  try {
    const { session } = this;
    const { classId, userId } = params;
    const res = await add.call(this, 'Appointment', { ...params, createdAt: Date.now() });
    const channel = session.channel(`Board-${classId}`);
    channel.dispatch(schema.update('Board', { id: parseInt(classId, 10), appointments: getAppointment(classId) }));
    addBoardActivity(this, db, { userId, boardId: classId, cardId: res, timeStamp: Date.now(), message: 'createAppointment', notiOnly: true });
    return res;
  } catch (e) {
    console.error('Error in addAppointment', e);
  }
}

export default [
  addAppointment,
];
