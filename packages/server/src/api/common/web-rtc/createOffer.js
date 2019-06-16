
export default async function createOffer(data) {
  console.log('createOffer called', data);
  const { session } = this;
  console.log('Channel data in createOffer', session.channel('Board'));
  const channel = session.channel('Board');
  channel.emit('offer', data[0], data[1]);
}
