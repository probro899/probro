/* eslint-disable import/no-cycle */
import update from '../../update';

function updateUserWorkExperience(record) {
  update.call(this, 'UserWorkExperience', ...record);
}

function updateUserEducation(record) {
  update.call(this, 'UserEducation', ...record);
}

function updateUserSkill(record) {
  update.call(this, 'UserSkill', ...record);
}

function updateUserPortal(record) {
  update.call(this, 'UserPortal', ...record);
}

function updateUserConnection(record) {
  update.call(this, 'UserConnection', ...record);
}

export default [
  updateUserEducation,
  updateUserWorkExperience,
  updateUserSkill,
  updateUserPortal,
  updateUserConnection,
];
