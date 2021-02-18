import getBoard from './getBoard';

export default (boarId, userId) => {
  const board = getBoard(boarId);
  let user = null;
  if (board) {
    user = board.users[userId];
  }
  return user;
};
