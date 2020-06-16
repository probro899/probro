/* eslint-disable import/no-cycle */
import userCloseHandler from './close-handler/userCloseHandler';
import classCloseHandler from './close-handler/classCloseHandler';

export default async function sfuCallStatusChange(data) {
  const { session } = this;
  console.log('data in SFU Call status handler', data);
  const { callStatusDetails, userList } = data;
  const { uid, broadCastId, broadCastType, callType, callDuration, type, connectionId } = callStatusDetails;

  if (broadCastType === 'UserConnection') {
    const channel = session.channel(`${broadCastType}-${broadCastId}`);
    channel.emit('callStatus', callStatusDetails, userList);

    if (type === 'declined') {
      console.log('history ko lagara goes here');
      userCloseHandler(callStatusDetails, userList, session);
    }
  }

  if (broadCastType === 'Board') {
    const channel = session.channel(`${broadCastType}-${broadCastId}`);
    if (type === 'declined') {
      classCloseHandler(callStatusDetails, session);
    }
    channel.emit('callStatus', callStatusDetails, userList);
  }
}
