export default async function createAnswer(data) {
  console.log('createAnswer called', data);
  const { session } = this;
  const { answerDetail } = data;
  const channel = session.channel(`${answerDetail.broadCastType}-${answerDetail.broadCastId}`);
  channel.emit('answer', data.answerDetail, data.userList);
}
