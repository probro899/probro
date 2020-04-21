'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _setUser = require('./setUser');

var _setUser2 = _interopRequireDefault(_setUser);

var _getUser = require('./getUser');

var _getUser2 = _interopRequireDefault(_getUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (boardId, userId, pcId, payload) => {
  const user = (0, _getUser2.default)(boardId, userId);
  (0, _setUser2.default)(boardId, userId, _extends({}, user, { [pcId]: payload }));
};