/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';
import checkAndCloseBoard from './checkAndCloseBoard';

export default (boardId, userId) => {
  const board = liveBoard.getBoard(boardId);
  const allPCsObj = board[userId];

  const allUser = Object.keys(board[userId]);


  allUser.forEach((uid) => {
    liveBoard.updatePc(boardId, userId, uid, { ...liveBoard.getPc(boardId, userId, uid), callClose: true });
  });

  const isCloseCall = checkAndCloseBoard(liveBoard, boardId, userId);

  // allUser.filter(uid => parseInt(uid, 10) === userId).filter(uid => uid !== 'isLive').forEach((uid) => {
  //   liveBoard.updatePc(boardId, userId, uid, { ...liveBoard.getPc(boardId, userId, uid), offer: false });
  // });

  return isCloseCall;
};
