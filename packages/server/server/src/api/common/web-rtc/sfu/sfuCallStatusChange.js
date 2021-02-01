/* eslint-disable import/no-cycle */
import schema from '@probro/common/source/src/schema';
import { liveBoard, database } from '../../../../cache';
import updateUserCache from '../../updateUserCache';
import userCloseHandler from './close-handler/userCloseHandler';
import classCloseHandler from './close-handler/classCloseHandler';

export default async function sfuCallStatusChange(data) {
  const { session } = this;
  // console.log('data in SFU Call status handler', data);
  const { callStatusDetails, userList } = data;
  const { broadCastId, broadCastType, type } = callStatusDetails;

  if (broadCastType === 'UserConnection') {
    const channel = session.channel(`${broadCastType}-${broadCastId}`);
    channel.emit('callStatus', callStatusDetails, userList);

    if (type === 'declined') {
      userCloseHandler(callStatusDetails, userList, session);
    }
  }

  if (broadCastType === 'Board') {
    const channel = session.channel(`${broadCastType}-${broadCastId}`);
    if (type === 'declined') {
      classCloseHandler(callStatusDetails, session);
    }

    if (type === 'callStarted') {
      const allLiveSessions = session.getChannel(`Board-${broadCastId}`);
      const board = liveBoard.getBoard(broadCastId);
      if (!board.startTime) {
        const startTime = Date.now();
        // udpate active status true in cache database
        database.update('Board', schema.update('Board', { id: broadCastId, startTime }));
        allLiveSessions.forEach(s => updateUserCache({ Board: { id: broadCastId, startTime } }, s, 'update'));
        liveBoard.setBoard(broadCastId, { ...board, startTime });
      }
    }

    channel.emit('callStatus', callStatusDetails, userList);
  }
}
