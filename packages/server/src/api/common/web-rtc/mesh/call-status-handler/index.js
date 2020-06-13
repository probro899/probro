/* eslint-disable import/no-cycle */
import db from '../../../../../db';
import updateUserCache from '../../../updateUserCache';

export default async function callStatusChange(data) {
  const { session } = this;
  // console.log('data in Call status handler', data);
  const { callStatusDetails, userList } = data;
  const { uid, broadCastId, broadCastType, callType, callDuration, type, connectionId } = callStatusDetails;

  if (broadCastType === 'UserConnection') {
    const channel = session.channel(`${broadCastType}-${broadCastId}`);
    channel.emit('callStatus', callStatusDetails, userList);
  }
  if (broadCastType === 'Board') {
    const channel = session.channel(`${broadCastType}-live-${broadCastId}`);
    channel.emit('callStatus', callStatusDetails, userList);
  }
}
