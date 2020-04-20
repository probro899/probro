'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _setBoard = require('./setBoard');

var _setBoard2 = _interopRequireDefault(_setBoard);

var _getBoard = require('./getBoard');

var _getBoard2 = _interopRequireDefault(_getBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (boardId, userId, payload) => {
  (0, _setBoard2.default)(boardId, _extends({}, (0, _getBoard2.default)(boardId), { [userId]: payload }));
};