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
  const { session } = this;
  const { broadCastId } = value;
  delete value.broadCastId;
  const res = await _db2.default.execute(async ({ update, findOne }) => {
    await update(table, value, condition);
    const findOneRes = await findOne(table, { id: condition.id });
    return findOneRes;
  });
  if (broadCastId) {
    const channel = session.channel(broadCastId);
    channel.dispatch(_schema2.default.update(table, res));
    _cache.user.update(_schema2.default.update(table, res), session);
  } else {
    // session.dispatch(schema.update(table, res));
    _cache.user.update(_schema2.default.update(table, res), session);
  }
};
// eslint-disable-next-line import/no-cycle