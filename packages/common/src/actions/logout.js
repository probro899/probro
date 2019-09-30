'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = 'LOGOUT';

var logout = function logout() {
  return {
    type: TYPE
  };
};
logout.TYPE = TYPE;
exports.default = logout;