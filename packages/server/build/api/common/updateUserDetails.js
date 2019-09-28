'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('../../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function updateUserDetails(record) {
  // console.log('update userDetails called', record);
  const { session } = this;

  try {
    const result = await _db2.default.execute(async ({ findOne, update, insert }) => {
      const findOneRes = await findOne('UserDetail', { userId: record.userId });
      if (findOneRes) {
        const updateRes = await update('UserDetail', record, { userId: record.userId });
        if (updateRes) {
          // console.log('updateRes', updateRes);
          const newRecord = await findOne('UserDetail', { userId: record.userId });
          session.dispatch(_schema2.default.update('UserDetail', newRecord));
          _cache.user.update(_schema2.default.update('UserDetail', newRecord), session);
          return 'User details updated successfully';
        }
        throw new Error('update Faild');
      }
      const insertRes = await insert('UserDetail', record);
      if (insertRes) {
        const userRes = await findOne('UserDetail', { userId: insertRes });
        session.dispatch(_schema2.default.add('UserDetail', userRes));
        _cache.user.add(_schema2.default.add('UserDetail', userRes), session);
        return 'User details inserted successfully';
      }
      throw new Error('User details insertion faild');
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// eslint-disable-next-line import/no-cycle