/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';

export default function commPingPong(data) {
  // console.log('clint ping called', data);
  try {
    const board = liveBoard.getBoard(data.boardId);
    if (board) {
      if (board.users) {
        liveBoard.setUser(data.boardId, 'users', { ...board.users, [data.userId]: true });
      }
    }
    console.log('Board value after ping', liveBoard.getBoard(data.boardId).users);
  } catch (e) {
    console.error('Error in commPingPong', e);
  }
}
