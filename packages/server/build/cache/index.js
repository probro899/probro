'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = undefined;

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
const users = new _lruCache2.default({
  max: 100
});

exports.user = _user2.default;
exports.default = {
  users
};