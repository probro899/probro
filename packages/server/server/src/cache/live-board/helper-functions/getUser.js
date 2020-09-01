import getBoard from './getBoard';

export default (boarId, userId) => {
  const board = getBoard(boarId);
  return board[userId];
};
