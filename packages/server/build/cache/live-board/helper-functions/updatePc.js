'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _setPc = require('./setPc');

var _setPc2 = _interopRequireDefault(_setPc);

var _getPC = require('./getPC');

var _getPC2 = _interopRequireDefault(_getPC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (boardId, userId, pcId, payload) => {
  const pc = (0, _getPC2.default)(boardId, userId, pcId);
  (0, _setPc2.default)(boardId, userId, pcId, _extends({}, pc, payload));
};