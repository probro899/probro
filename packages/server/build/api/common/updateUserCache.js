'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateUserCache;

var _schema = require('@probro/common/source/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _cache = require('../../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
function updateUserCache(obj, session, todo) {
  Object.keys(obj).forEach(key => {
    session.dispatch(_schema2.default[todo](key, obj[key]));
    _cache.user.update(_schema2.default[todo](key, obj[key]), session);
  });
}