'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateUserCache;

var _schema = require('@probro/common/source/src/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateUserCache(obj, session, todo) {
  Object.keys(obj).forEach(key => {
    session.dispatch(_schema2.default[todo](key, obj[key]));
    // database.update(schema[todo](key, obj[key]));
  });
} /* eslint-disable import/no-cycle */