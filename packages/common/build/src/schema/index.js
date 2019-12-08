'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  init: _init2.default,
  add: _add2.default,
  remove: _remove2.default,
  update: _update2.default,
  map: _map2.default,
  all: _all2.default,
  get: _get2.default
};