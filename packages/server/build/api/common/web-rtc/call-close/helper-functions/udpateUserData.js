'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _updateUserCache = require('../../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

var _update = require('../../../../../cache/database/update');

var _update2 = _interopRequireDefault(_update);

var _schema = require('@probro/common/source/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _db = require('../../../../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/order
exports.default = async (callCloseDetail, session) => {
  const resId = await _db2.default.execute(async ({ insert }) => {
    const insertRes = await insert('BoardMessage', {
      userId: callCloseDetail.uid,
      boardId: callCloseDetail.broadCastId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration,
      message: callCloseDetail.callType || ''
    });
    return insertRes;
  });

  const dataTobeUpdate = {
    BoardMessage: {
      id: resId,
      userId: callCloseDetail.uid,
      boardId: callCloseDetail.broadCastId,
      timeStamp: Date.now(),
      type: callCloseDetail.callType,
      duration: callCloseDetail.callDuration,
      message: callCloseDetail.callType
    }
  };
  (0, _updateUserCache2.default)(dataTobeUpdate, session, 'add');
  (0, _update2.default)('BoardMessage', _schema2.default.add('BoardMessage', dataTobeUpdate.BoardMessage));
};