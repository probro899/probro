'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _update = require('../../update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateUserWorkExperience(record) {
  _update2.default.call(this, 'UserWorkExperience', ...record);
} /* eslint-disable import/no-cycle */


function updateUserEducation(record) {
  _update2.default.call(this, 'UserEducation', ...record);
}

function updateUserSkill(record) {
  _update2.default.call(this, 'UserSkill', ...record);
}

function updateUserPortal(record) {
  _update2.default.call(this, 'UserPortal', ...record);
}

function updateUserConnection(record) {
  _update2.default.call(this, 'UserConnection', ...record);
}

exports.default = [updateUserEducation, updateUserWorkExperience, updateUserSkill, updateUserPortal, updateUserConnection];