'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

var _connectUser = require('./connectUser');

var _connectUser2 = _interopRequireDefault(_connectUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
async function addUserWorkExperience(record) {
  const res = await _add2.default.call(this, 'UserWorkExperience', record);
  return res;
}

async function addUserEducation(record) {
  const res = await _add2.default.call(this, 'UserEducation', record);
  return res;
}

async function addUserSkill(record) {
  const res = await _add2.default.call(this, 'UserSkill', record);
  return res;
}

async function addUserPortal(record) {
  const res = await _add2.default.call(this, 'UserPortal', record);
  return res;
}

async function addUserMessage(record) {
  const res = await _add2.default.call(this, 'UserMessage', record);
  return res;
}

async function addUserMessageSeenStatus(record) {
  const res = await _add2.default.call(this, 'UserMessageSeenStatus', record);
  return res;
}

async function addCarrierInterest(record) {
  const res = await _add2.default.call(this, 'UserCarrierInterest', record);
  return res;
}

async function addNotificationReadStatus(record) {
  const res = await _add2.default.call(this, 'NotificationReadStatus', record);
  return res;
}

exports.default = [addUserWorkExperience, addUserEducation, addUserSkill, addUserPortal, addUserMessage, addUserMessageSeenStatus, _connectUser2.default, addCarrierInterest, addNotificationReadStatus];