
export default async function callClose(data) {
  console.log('call close method called', data);
  const { session } = this;
  const { callCloseDetail } = data;
  const channel = session.channel(`${callCloseDetail.broadCastType}-${callCloseDetail.broadCastId}`);
  channel.emit('callEnd', data.callCloseDetail, data.userList);
}
