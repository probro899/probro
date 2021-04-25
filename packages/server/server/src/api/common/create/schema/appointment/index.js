import add from '../../add';

async function addAppointment(params) {
  const res = await add.call(this, 'Appointment', { ...params, createdAt: Date.now() });
  return res;
}

export default [
  addAppointment,
];
