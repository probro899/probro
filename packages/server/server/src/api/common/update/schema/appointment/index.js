import update from '../../update';

async function updateAppointment(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'Appointment', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

export default [
  updateAppointment,
];
