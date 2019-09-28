'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _blog = require('./blog');

var _blog2 = _interopRequireDefault(_blog);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [..._board2.default, ..._blog2.default, ..._user2.default]; /* eslint-disable import/no-cycle */