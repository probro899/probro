import liveBoard from '../cache';

export default (boardId, payload) => {
  liveBoard.set(boardId, payload);
};
