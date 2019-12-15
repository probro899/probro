
export default async function callClose(data) {
  console.log('call close method called', data);
  const { session } = this;
  const { offerDetail } = data;
  const channel = session.channel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
  channel.emit('callEnd', data.offerDetail, data.userList);
}
