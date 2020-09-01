import liveBoard from '../cache';

export default (boardId) => {
  return liveBoard.get(boardId);
};
