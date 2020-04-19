/* eslint-disable no-lonely-if */
import isSend from './isSend';

export default async function addIceCandidate(data) {
  // console.log('addIcecandidate called', data);
  const { session } = this;
  if (data.iceCandidateDetail.broadCastType === 'UserConnection') {
    const channel = session.channel(`${data.iceCandidateDetail.broadCastType}-${data.iceCandidateDetail.broadCastId}`);
    channel.emit('icecandidate', data.iceCandidateDetail, data.userList);
  } else {
    if (!isSend(data.iceCandidateDetail, data.userList[0].userId)) {
      const channel = session.channel(`${data.iceCandidateDetail.broadCastType}-live-${data.iceCandidateDetail.broadCastId}`);
      channel.emit('icecandidate', data.iceCandidateDetail, data.userList);
    }
  }
}
