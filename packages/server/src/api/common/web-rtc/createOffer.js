
export default async function createOffer(data) {
  console.log('createOffer called', data);
  const { session } = this;
  console.log('Channel data in createOffer', session.channel('Main'));
  const channel = session.channel('Main');
  channel.emit('offer', data[0], data[1]);
}
