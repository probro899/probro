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

exports.default = async function add(table, record) {
  console.log('add api called', table, record);
  const { session } = this;
  const { broadCastId, broadCastUserList } = record;
  delete record.broadCastId;
  delete record.broadCastUserList;
  const res = await _db2.default.execute(async ({ insert, findOne }) => {
    let boardId = null;
    let boardDetails = null;
    if (Array.isArray(record)) {
      const promises = record.map(obj => insert(table, obj));
      const skillIds = await Promise.all(promises);
      const findOneAllRes = skillIds.map(id => findOne(table, { id }));
      boardDetails = await Promise.all(findOneAllRes);
    } else {
      boardId = await insert(table, record);
      boardDetails = await findOne(table, { id: boardId });
    }
    if (boardDetails) {
      // console.log('inisside borad detils', boardDetails);
      if (broadCastId) {
        // console.log('inside baordcaseid', broadCastId);
        if (broadCastUserList) {
          // console.log('inside boardcastUserliSt', broadCastUserList);
          const channel = session.channel(broadCastId);
          const allChannelSession = session.getChannel(broadCastId);
          const allUserSession = [];
          broadCastUserList.forEach(userIdObj => allUserSession.push(allChannelSession.find(s => s.values.user.id === userIdObj.userId)));
          channel.dispatch(_schema2.default.add(table, boardDetails), broadCastUserList);
          [...allUserSession, session].forEach(s => _cache.user.update(_schema2.default.add(table, boardDetails), s));
        } else {
          const channel = session.channel(broadCastId);
          const allChannelSession = session.getChannel(broadCastId);
          // console.log('current channel', allChannelSession);
          channel.dispatch(_schema2.default.add(table, boardDetails), null, session.values.user.id);
          allChannelSession.forEach(s => _cache.user.update(_schema2.default.add(table, boardDetails), s));
        }
      } else {
        // session.dispatch(schema.add(table, boardDetails));
        _cache.user.update(_schema2.default.add(table, boardDetails), session);
      }
    }
    // console.log('boardId', boardId);
    return boardId;
  });
  console.log('res', res);
  return res;
};
// eslint-disable-next-line import/no-cycle