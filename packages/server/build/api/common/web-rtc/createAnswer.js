'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function createAnswer(data) {
  console.log('createAnswer called', data);
  const { session } = this;
  const channel = session.channel(`Board-${data.answerDetail.boardId}`);
  channel.emit('answer', data.answerDetail, data.userList);
};