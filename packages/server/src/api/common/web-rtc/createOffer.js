import schema from "@probro/common/source/src/schema";

export default async function createOffer(data) {
  const { session } = this;
  const { offerDetail } = data;
  if (offerDetail.broadCastType === 'UserConnection') {
    const channel = session.channel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
    channel.emit('offer', data.offerDetail, data.userList);
  }
  if (offerDetail.broadCastType === 'Board') {
    const allBoardUserSession = session.getChannel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
    const liveBoardChannelBefore = session.getChannel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);
    if (!liveBoardChannelBefore) {
      console.log('no board found so sbscribe the all user to the live board', liveBoardChannelBefore);
      allBoardUserSession.forEach(s => s.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));
      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);
      liveBoardChannel.emit('offer', data.offerDetail, data.userList);
      liveBoardChannel.dispatch(schema.update('Board', { id: offerDetail.broadCastId, activeStatus: true }));
    } else if (liveBoardChannelBefore.length <= 1) {
      console.log('only one or zoro user are live', liveBoardChannelBefore.length);
      liveBoardChannelBefore.forEach(s => s.unsubscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));
      allBoardUserSession.forEach(s => s.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));
      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);
      liveBoardChannel.emit('offer', data.offerDetail, data.userList);
    } else {
      session.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);
      console.log('board are live now', liveBoardChannelBefore.length);
      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);
      liveBoardChannel.emit('offer', data.offerDetail, data.userList);
    }
  }
}
