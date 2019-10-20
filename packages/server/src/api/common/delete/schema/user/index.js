// eslint-disable-next-line import/no-cycle
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

function deleteUserCarrierInterest(record) {
  Delete.call(this, 'UserCarrierInterest', record);
}

export default [
  deleteUserWorkExperience,
  deleteUserEducation,
  deleteUserSkill,
  deleteUserPortal,
  deleteUserCarrierInterest,
];
