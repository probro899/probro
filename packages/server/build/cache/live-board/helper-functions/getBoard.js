'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = boardId => {
  return _cache2.default.get(boardId);
};