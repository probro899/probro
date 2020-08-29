'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const users = new _lruCache2.default();

exports.default = users;