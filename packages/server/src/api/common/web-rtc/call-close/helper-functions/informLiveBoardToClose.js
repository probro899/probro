/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';
import checkAndCloseBoard from './checkAndCloseBoard';

export default (boardId, userId) => {
  const board = liveBoard.getBoard(boardId);

  const allUser = Object.keys(board);

  allUser.filter(uid => parseInt(uid, 10) !== userId).filter(uid => uid !== 'isLive').forEach((uid) => {
    liveBoard.updatePc(boardId, uid, userId, { ...liveBoard.getPc(boardId, uid, userId), callClose: true });
  });

  const isCloseCall = checkAndCloseBoard(liveBoard, boardId, userId);

  return isCloseCall;
};
