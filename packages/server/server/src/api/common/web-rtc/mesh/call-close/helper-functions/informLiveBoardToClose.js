/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../../cache';
import checkAndCloseBoard from './checkAndCloseBoard';

export default (boardId, userId) => {
  const board = liveBoard.getBoard(boardId);

  if (board) {
    const userpcs = board[userId];

    if (userpcs) {
      const allUser = Object.keys(userpcs);
      allUser.forEach((uid) => {
        liveBoard.updatePc(boardId, userId, uid, { ...liveBoard.getPc(boardId, userId, uid), callClose: true });
      });

      const isCloseCall = checkAndCloseBoard(liveBoard, boardId, userId);
      return isCloseCall;
    }
  }
};
