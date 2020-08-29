'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function addIceCandidate(data) {
  console.log('addIcecandidate called', data);
  const { session } = this;
  if (data.iceCandidateDetail.broadCastType === 'UserConnection') {
    const channel = session.channel(`${data.iceCandidateDetail.broadCastType}-${data.iceCandidateDetail.broadCastId}`);
    channel.emit('icecandidate', data.iceCandidateDetail, data.userList);
  } else {
    const channel = session.channel(`${data.iceCandidateDetail.broadCastType}-live-${data.iceCandidateDetail.broadCastId}`);
    channel.emit('icecandidate', data.iceCandidateDetail, data.userList);
  }
};