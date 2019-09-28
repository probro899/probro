'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logout;

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _actions = require('@probro/common/src/actions');

var actions = _interopRequireWildcard(_actions);

var _cache = require('../../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logout() {
  const { session } = this;
  const user = session.get('user');
  _cache2.default.users.del(user.token);
  session.values.userData.Board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b })).forEach(obj => obj.channel.dispatch(_schema2.default.update('User', { id: session.values.user.id, activeStatus: false })));
  session.dispatch(actions.logout());
  session.emit('logout');
  // close the session on logout
  session.close();
} /* eslint-disable import/no-cycle */