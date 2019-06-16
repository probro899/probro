
export default async function createAnswer(data) {
  console.log('createAnswer called', data);
  const { session } = this;
  console.log('Channel data in createOffer', session.channel('Board'));
  const channel = session.channel('Board');
  channel.emit('answer', data[0], data[1]);
}
