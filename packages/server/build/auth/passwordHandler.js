'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPassword = exports.genHashPassword = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRound = 10;

const genHashPassword = exports.genHashPassword = plainTextPassword => _bcrypt2.default.hash(plainTextPassword, saltRound);

const checkPassword = exports.checkPassword = (plainTextPassword, hashedPassword) => _bcrypt2.default.compare(plainTextPassword, hashedPassword);