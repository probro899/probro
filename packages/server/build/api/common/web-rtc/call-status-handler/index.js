'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../../../db');

var _db2 = _interopRequireDefault(_db);

var _updateUserCache = require('../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = async function callStatusChange(data) {
  const { session } = this;
  console.log('data in Call status handler', data);
  const { callStatusDetails, userList } = data;
  const { uid, broadCastId, broadCastType, callType, callDuration, type, connectionId } = callStatusDetails;

  if (broadCastType === 'UserConnection') {
    const channel = session.channel(`${broadCastType}-${broadCastId}`);
    channel.emit('callStatus', callStatusDetails, userList);
  }
  if (broadCastType === 'Board') {
    const channel = session.channel(`${broadCastType}-live-${broadCastId}`);
    channel.emit('callStatus', callStatusDetails, userList);
  }
};