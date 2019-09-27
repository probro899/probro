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

exports.default = async function Delete(table, record) {
  // console.log('db delete called', table, record, this.session);
  try {
    const { session } = this;
    const { broadCastId } = record;
    delete record.broadCastId;

    const res = _db2.default.execute(async ({ deleteQuery }) => {
      const delRes = await deleteQuery(table, record);
      if (broadCastId) {
        const channel = session.channel(broadCastId);
        channel.dispatch(_schema2.default.remove(table, { id: record.id }));
        _cache.user.update(_schema2.default.remove(table, { id: record.id }), session);
      } else {
        // session.dispatch(schema.remove(table, { id: record.id }));
        _cache.user.update(_schema2.default.remove(table, { id: record.id }), session);
      }
      return delRes;
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
// eslint-disable-next-line import/no-cycle