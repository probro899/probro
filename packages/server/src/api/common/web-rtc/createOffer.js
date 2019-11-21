export default async function createOffer(data) {
  const { session } = this;
  const { offerDetail } = data;
  const channel = session.channel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
  console.log('data in create offer', data);
  channel.emit('offer', data.offerDetail, data.userList);
}
