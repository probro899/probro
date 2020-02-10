'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function createAnswer(data) {
  console.log('createAnswer called', data);
  const { session } = this;
  const { answerDetail } = data;
  if (answerDetail.broadCastType === 'Board') {
    const channel = session.channel(`${answerDetail.broadCastType}-live-${answerDetail.broadCastId}`);
    channel.emit('answer', data.answerDetail, data.userList);
  } else {
    const channel = session.channel(`${answerDetail.broadCastType}-${answerDetail.broadCastId}`);
    channel.emit('answer', data.answerDetail, data.userList);
  }
};