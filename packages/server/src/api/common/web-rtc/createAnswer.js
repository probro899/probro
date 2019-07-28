
export default async function createAnswer(data) {
  console.log('createAnswer called', data);
  const { session } = this;
  console.log('Channel data in createOffer', session.channel('Main'));
  const channel = session.channel('Main');
  channel.emit('answer', data[0], data[1]);
}
