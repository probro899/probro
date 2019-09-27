'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delete = require('../../delete');

var _delete2 = _interopRequireDefault(_delete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deleteUserWorkExperience(record) {
  _delete2.default.call(this, 'UserWorkExperience', record);
}

function deleteUserEducation(record) {
  _delete2.default.call(this, 'UserEducation', record);
}

function deleteUserSkill(record) {
  _delete2.default.call(this, 'UserSkill', record);
}

function deleteUserPortal(record) {
  _delete2.default.call(this, 'UserPortal', record);
}

exports.default = [deleteUserWorkExperience, deleteUserEducation, deleteUserSkill, deleteUserPortal];