'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _flat = require('../../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = id => {
  let connectionListMid = [];
  let connectionListUserId = [];
  const allUserConnections = _cache2.default.get('UserConnection');
  connectionListMid = allUserConnections.filter(uc => uc.mId === id);
  connectionListUserId = allUserConnections.filter(uc => uc.userId === id);
  const connectionList = [...connectionListMid, ...connectionListUserId];
  const allConnectionUserList = _lodash2.default.uniq((0, _flat2.default)(connectionList.map(obj => [obj.mId, obj.userId])));
  // console.log('allConnecitonUserList', allConnectionUserList);
  return { connectionList, allConnectionUserList };
};