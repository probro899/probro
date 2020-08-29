'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = 'LOGIN';

var login = function login(user) {
  return {
    type: TYPE,
    payload: user
  };
};

login.TYPE = TYPE;
exports.default = login;