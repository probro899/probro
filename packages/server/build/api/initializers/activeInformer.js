'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _flat = require('../flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (id, Board, UserConnection, session, status) => {
  // inform all the board to i am online now
  return function activeInformer() {
    Board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b })).forEach(obj => obj.channel.dispatch(_schema2.default.update('User', { id, activeStatus: status })));

    // inform all freind to i am online now
    _lodash2.default.uniq((0, _flat2.default)(UserConnection.map(obj => [obj.mId, obj.userId]))).map(uid => ({ channel: session.channel(`UserConnection-${uid}`) })).forEach(obj => obj.channel.dispatch(_schema2.default.update('User', { id, activeStatus: status })));
  };
};