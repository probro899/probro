import Delete from '../../delete';

async function deleteAppointment(params) {
  const res = await Delete.call(this, 'Appointment', params);
  return res;
}

export default [
  deleteAppointment,
];
