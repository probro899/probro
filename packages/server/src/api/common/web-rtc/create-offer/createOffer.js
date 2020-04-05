import boardHandler from './board';

export default async function createOffer(data) {
  // console.log('Create offer api called');
  const { session } = this;
  const { offerDetail } = data;
  if (offerDetail.broadCastType === 'UserConnection') {
    const channel = session.channel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
    channel.emit('offer', data.offerDetail, data.userList);
  }
  if (offerDetail.broadCastType === 'Board') {
    boardHandler(session, data);
  }
}
