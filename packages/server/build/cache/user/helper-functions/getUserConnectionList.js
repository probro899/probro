'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _flat = require('../../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (find, id) => {
  let connectionListMid = [];
  let connectionListUserId = [];
  connectionListMid = await find('UserConnection', { mId: id });
  connectionListUserId = await find('UserConnection', { userId: id });
  const connectionList = [...connectionListMid, ...connectionListUserId];
  const allConnectionUserList = _lodash2.default.uniq((0, _flat2.default)(connectionList.map(obj => [obj.mId, obj.userId])));
  // console.log('allConnecitonUserList', allConnectionUserList);
  return { connectionList, allConnectionUserList };
};