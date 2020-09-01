import setBoard from './setBoard';
import getBoard from './getBoard';

export default (boardId, userId, payload) => {
  setBoard(boardId, { ...getBoard(boardId), [userId]: payload });
};
