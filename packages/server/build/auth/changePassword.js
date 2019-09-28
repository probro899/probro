'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _passwordHandler = require('./passwordHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function changePassword(userId, oldPassword, newPassword) {
  return _db2.default.execute(async ({ update, findOne }) => {
    const record = await findOne('User', { id: userId });
    if (!record || !(0, _passwordHandler.checkPassword)(oldPassword, record.password)) {
      throw new Error('Invalid password');
    }

    const password = (0, _passwordHandler.genHashPassword)(newPassword);
    // Change the password
    await update('User', { password }, { id: userId });
  });
};