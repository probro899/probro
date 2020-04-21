'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.liveBoard = exports.database = undefined;

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _liveBoard = require('./live-board');

var _liveBoard2 = _interopRequireDefault(_liveBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const users = new _lruCache2.default({
  max: 100000
}); /* eslint-disable import/no-cycle */
exports.database = _database2.default;
exports.liveBoard = _liveBoard2.default;
exports.default = {
  users
};