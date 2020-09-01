/* eslint-disable import/no-cycle */
import _ from 'lodash';
import { liveBoard } from '../../../../../../cache';

export default (boardId, userId) => {
  const board = liveBoard.getBoard(boardId);
  // console.log('Call end Anyliser called', board);
  if (board) {
    const user = board[userId];
    if (user) {
      const isClose = Object.values(user).find(pc => !pc.callClose);
      if (isClose) {
        const callType = Object.values(user).find(pc => !pc.offer) ? 'Incoming' : 'Outgoing';
        const startTime = _.min(Object.values(user).map(pc => pc.startTime).filter(t => t));
        const callDuration = Date.now() - startTime;
        return { callType, callDuration, uid: userId, broadCastId: boardId };
      }
    }
  }
  return null;
};
