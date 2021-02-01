/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../cache';
import callClose from './closeSfuCall';

export default (session, boardId) => {
  try {
    const board = liveBoard.getBoard(boardId);
    const liveBoardChannel = session.channel(`Board-${boardId}`);
    let isCallClose = false;
    // console.log('heartbit called', board);
    if (Object.keys(board.users).length <= 1 && !board.isFirstPing) {
      // console.log('close the call right now');
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
