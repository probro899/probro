'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _passwordHandler = require('./passwordHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function resetPassword(resetToken, newPassword) {
  const userId = _cache2.default.users.get(resetToken);

  if (!userId) {
    throw new Error('Invalid token');
  }

  const password = (0, _passwordHandler.genHashPassword)(newPassword);

  await _db2.default.execute(({ update }) => {
    update('User', { password }, { id: userId });
  });
};