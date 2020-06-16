import registerAnswer from './registerAnswer';

export default async function createAnswer(data) {
  // console.log('createAnswer called', data);
  const { session } = this;
  const { answerDetail } = data;
  if (answerDetail.broadCastType === 'Board') {
    const channel = session.channel(`${answerDetail.broadCastType}-live-${answerDetail.broadCastId}`);
    channel.emit('answer', data.answerDetail, data.userList);
    registerAnswer(answerDetail, data.userList[0].userId);
  } else {
    const channel = session.channel(`${answerDetail.broadCastType}-${answerDetail.broadCastId}`);
    channel.emit('answer', data.answerDetail, data.userList);
  }
}
