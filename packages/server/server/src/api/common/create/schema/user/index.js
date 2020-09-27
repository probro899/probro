/* eslint-disable import/no-cycle */
import add from '../../add';
import connectUser from './connectUser';

async function addUserWorkExperience(record) {
  const res = await add.call(this, 'UserWorkExperience', record);
  return res;
}

async function addUserEducation(record) {
  const res = await add.call(this, 'UserEducation', record);
  return res;
}

async function addUserSkill(record) {
  const res = await add.call(this, 'UserSkill', record);
  return res;
}

async function addUserPortal(record) {
  const res = await add.call(this, 'UserPortal', record);
  return res;
}

async function addUserMessage(record) {
  const res = await add.call(this, 'UserMessage', { ...record, timeStamp: Date.now() });
  return res;
}

async function addUserMessageSeenStatus(record) {
  const res = await add.call(this, 'UserMessageSeenStatus', record);
  return res;
}

async function addCarrierInterest(record) {
  const res = await add.call(this, 'UserCarrierInterest', record);
  return res;
}

async function addNotificationReadStatus(record) {
  console.log('add notification read status called', record);
  const res = await add.call(this, 'NotificationReadStatus', record);
  return res;
}

export default [
  addUserWorkExperience,
  addUserEducation,
  addUserSkill,
  addUserPortal,
  addUserMessage,
  addUserMessageSeenStatus,
  connectUser,
  addCarrierInterest,
  addNotificationReadStatus,
];
