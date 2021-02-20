/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../cache';
import callClose from './closeSfuCall';

export default (session, boardId) => {
  try {
    const board = liveBoard.getBoard(boardId);
    const liveBoardChannel = session.channel(`Board-${boardId}`);
    let isCallClose = false;
    const isUserAvailable = Object.values(board.users).filter(u => u);
    console.log('heartbit called', board.users, isUserAvailable);
    
    if (isUserAvailable <= 1 && !board.isFirstPing) {
      clearInterval(board.heartbitChecker);
      callClose.call({ session }, { id: boardId, activeStatus: null });
      liveBoard.setBoard(boardId, null);
      isCallClose = true;
    }
    if (!isCallClose) {
      liveBoard.setBoard(boardId, { ...board, isFirstPing: false, users: {} });
      liveBoardChannel.emit('ping', { boardId });
    }
  } catch (e) {
    console.log('Error in Sfu Heartbeater', e);
  }
};
