import Delete from '../../delete';

function deleteUserWorkExperience(record) {
  Delete.call(this, 'UserWorkExperience', record);
}

function deleteUserEducation(record) {
  Delete.call(this, 'UserEducation', record);
}

function deleteUserSkill(record) {
  Delete.call(this, 'UserSkill', record);
}

function deleteUserPortal(record) {
  Delete.call(this, 'UserPortal', record);
}

export default [
  deleteUserWorkExperience,
  deleteUserEducation,
  deleteUserSkill,
  deleteUserPortal,
];
