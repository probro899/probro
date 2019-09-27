'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addUserWorkExperience(record) {
  _add2.default.call(this, 'UserWorkExperience', record);
} /* eslint-disable import/no-cycle */


function addUserEducation(record) {
  _add2.default.call(this, 'UserEducation', record);
}

function addUserSkill(record) {
  _add2.default.call(this, 'UserSkill', record);
}

function addUserPortal(record) {
  _add2.default.call(this, 'UserPortal', record);
}

function addUserMessage(record) {
  _add2.default.call(this, 'UserMessage', record);
}

function connectUser(record) {
  _add2.default.call(this, 'UserConnection', record);
}

exports.default = [addUserWorkExperience, addUserEducation, addUserSkill, addUserPortal, addUserMessage, connectUser];