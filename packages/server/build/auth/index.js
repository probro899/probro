'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forgot = require('./forgot');

var _forgot2 = _interopRequireDefault(_forgot);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _passwordHandler = require('./passwordHandler');

var _passwordHandler2 = _interopRequireDefault(_passwordHandler);

var _changePassword = require('./changePassword');

var _changePassword2 = _interopRequireDefault(_changePassword);

var _reset = require('./reset');

var _reset2 = _interopRequireDefault(_reset);

var _validateToken = require('./validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

var _emailVerification = require('./emailVerification');

var _emailVerification2 = _interopRequireDefault(_emailVerification);

var _userRegistration = require('./userRegistration');

var _userRegistration2 = _interopRequireDefault(_userRegistration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  forgot: _forgot2.default,
  login: _login2.default,
  passwordHandler: _passwordHandler2.default,
  changePassword: _changePassword2.default,
  reset: _reset2.default,
  validateToken: _validateToken2.default,
  emailVerification: _emailVerification2.default,
  userRegistration: _userRegistration2.default
};