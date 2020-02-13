'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../../../db');

var _db2 = _interopRequireDefault(_db);

var _userCallCloseHandler = require('./userCallCloseHandler');

var _userCallCloseHandler2 = _interopRequireDefault(_userCallCloseHandler);

var _boardCallClose = require('./boardCallClose');

var _boardCallClose2 = _interopRequireDefault(_boardCallClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function callClose(data) {
  console.log('call close method called', data);
  const { session } = this;
  // console.log('sesssion', session);
  const { callCloseDetail, userList } = data;
  const res = _db2.default.execute(async ({ insert }) => {
    if (callCloseDetail.type === 'user') {
      await (0, _userCallCloseHandler2.default)(insert, callCloseDetail, userList, session);
    }
    if (callCloseDetail.type === 'board') {
      await (0, _boardCallClose2.default)(insert, callCloseDetail, userList, session);
    }
  });
}; /* eslint-disable import/no-cycle */