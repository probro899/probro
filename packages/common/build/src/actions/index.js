'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = undefined;

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _logout = require('./logout');

var _logout2 = _interopRequireDefault(_logout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.login = _login2.default;
exports.logout = _logout2.default;