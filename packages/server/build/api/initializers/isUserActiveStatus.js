"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = isUserActiveStatus;
function isUserActiveStatus(boards, userList) {
  const finalUserList = userList.map(u => {
    for (let i = 0; i < boards.length; i += 1) {
      if (boards[i].values.user.id === u.id) {
        return _extends({}, u, { activeStatus: true });
      }
    }
    return _extends({}, u, { activeStatus: false });
  });
  return finalUserList;
}