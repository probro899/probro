'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getBoard = require('./helper-functions/getBoard');

var _getBoard2 = _interopRequireDefault(_getBoard);

var _getPC = require('./helper-functions/getPC');

var _getPC2 = _interopRequireDefault(_getPC);

var _getUser = require('./helper-functions/getUser');

var _getUser2 = _interopRequireDefault(_getUser);

var _setBoard = require('./helper-functions/setBoard');

var _setBoard2 = _interopRequireDefault(_setBoard);

var _setPc = require('./helper-functions/setPc');

var _setPc2 = _interopRequireDefault(_setPc);

var _setUser = require('./helper-functions/setUser');

var _setUser2 = _interopRequireDefault(_setUser);

var _updatePc = require('./helper-functions/updatePc');

var _updatePc2 = _interopRequireDefault(_updatePc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { getBoard: _getBoard2.default, getPc: _getPC2.default, getUser: _getUser2.default, setBoard: _setBoard2.default, setPc: _setPc2.default, setUser: _setUser2.default, updatePc: _updatePc2.default };