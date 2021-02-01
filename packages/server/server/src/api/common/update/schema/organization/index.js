/* eslint-disable import/no-cycle */
import update from '../../update';

function updateOrganization(records) {
  // console.log('updateBoard func', records, session.values);
  const record = records[0];
  delete record.todo;
  update.call(this, 'Board', record, records[1]);
}

function updateOrganizationMember(records) {
  const record = records[0];
  update.call(this, 'BoardColumn', record, records[1]);
}

export default [
  updateOrganization,
  updateOrganizationMember,
];
