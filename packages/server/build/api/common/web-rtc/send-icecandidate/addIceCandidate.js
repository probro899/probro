'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSend = require('./isSend');

var _isSend2 = _interopRequireDefault(_isSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function addIceCandidate(data) {
  // console.log('addIcecandidate called', data);
  const { session } = this;
  if (data.iceCandidateDetail.broadCastType === 'UserConnection') {
    const channel = session.channel(`${data.iceCandidateDetail.broadCastType}-${data.iceCandidateDetail.broadCastId}`);
    channel.emit('icecandidate', data.iceCandidateDetail, data.userList);
  } else {
    if (!(0, _isSend2.default)(data.iceCandidateDetail, data.userList[0].userId)) {
      const channel = session.channel(`${data.iceCandidateDetail.broadCastType}-live-${data.iceCandidateDetail.broadCastId}`);
      channel.emit('icecandidate', data.iceCandidateDetail, data.userList);
    }
  }
}; /* eslint-disable no-lonely-if */