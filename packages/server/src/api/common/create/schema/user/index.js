/* eslint-disable import/no-cycle */
import add from '../../add';

function addUserWorkExperience(record) {
  add.call(this, 'UserWorkExperience', record);
}

function addUserEducation(record) {
  add.call(this, 'UserEducation', record);
}

function addUserSkill(record) {
  add.call(this, 'UserSkill', record);
}

function addUserPortal(record) {
  add.call(this, 'UserPortal', record);
}

function addUserMessage(record) {
  add.call(this, 'UserMessage', record);
}

function connectUser(record) {
  add.call(this, 'UserConnection', record);
}

export default [
  addUserWorkExperience,
  addUserEducation,
  addUserSkill,
  addUserPortal,
  addUserMessage,
  connectUser,
];
