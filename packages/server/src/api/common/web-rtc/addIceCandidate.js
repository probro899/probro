
export default async function addIceCandidate(data) {
  console.log('addIcecandidate called', data);
  const { session } = this;
  const channel = session.channel('Board');
  channel.emit('icecandidate', data[0], data[1]);
}
