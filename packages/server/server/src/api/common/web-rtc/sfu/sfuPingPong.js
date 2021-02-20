/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../cache';

export default function sfuPingPong(data) {
  // console.log('sfuPingPong called', data);
  try {
    const board = liveBoard.getBoard(data.boardId);
    if (board) {
      if (board.users) {
        liveBoard.setUser(data.boardId, 'users', { ...board.users, [data.userId]: true });
      }
    }
  } catch (e) {
    console.error('Error in sfuPingPong', e);
  }
}
