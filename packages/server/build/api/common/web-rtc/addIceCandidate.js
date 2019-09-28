'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function addIceCandidate(data) {
  console.log('addIcecandidate called', data);
  const { session } = this;
  const channel = session.channel(`Board-${data.iceCandidateDetail.boardId}`);
  channel.emit('icecandidate', data.iceCandidateDetail, data.userList);
};