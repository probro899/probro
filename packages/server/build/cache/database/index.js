'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _initCacheDB = require('./initCacheDB');

var _initCacheDB2 = _interopRequireDefault(_initCacheDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { get: _get2.default, update: _update2.default, initCacheDB: _initCacheDB2.default };