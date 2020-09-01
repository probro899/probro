/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../cache';
import callClose from './closeSfuCall';

export default (session, boardId) => {
  // console.log('ping method called', boardId);
  const board = liveBoard.getBoard(boardId);
  const liveBoardChannel = session.channel(`Board-${boardId}`);
  let isCallClose = false;
  if (Object.keys(board.users).length <= 1) {
    // console.log('close the call right now');
    clearInterval(board.heartbitChecker);
    callClose.call({ session }, { id: boardId, activeStatus: null });
    liveBoard.setBoard(boardId, null);
    isCallClose = true;
  }
  if (!isCallClose) {
    liveBoard.setUser(boardId, 'users', {});
    liveBoardChannel.emit('ping', { boardId });
  }
};
