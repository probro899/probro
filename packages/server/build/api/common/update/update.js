'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _db = require('../../../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('../../../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function Update(table, value, condition) {
  try {
    console.log('Main update called', table, value, condition);
    delete value.todo;
    const { session } = this;
    const { broadCastId } = value;
    // console.log('update value', value, value);
    delete value.broadCastId;
    const res = await _db2.default.execute(async ({ update, findOne }) => {
      await update(table, value, condition);
      const findOneRes = await findOne(table, { id: condition.id });
      return findOneRes;
    });
    if (broadCastId) {
      console.log('res', res);
      const channel = session.channel(broadCastId);
      channel.dispatch(_schema2.default.update(table, res));
      _cache.database.update(table, _schema2.default.update(table, res));
    } else {
      _cache.database.update(table, _schema2.default.update(table, res));
    }
    return res;
  } catch (e) {
    console.log('error in update', e);
  }
};
// eslint-disable-next-line import/no-cycle