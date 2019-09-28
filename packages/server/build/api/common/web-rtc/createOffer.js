'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function createOffer(data) {
  const { session } = this;
  const channel = session.channel(`Board-${data.offerDetail.boardId}`);
  console.log('data in create offer', data);
  channel.emit('offer', data.offerDetail, data.userList);
};