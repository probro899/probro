import getUser from './getUser';

export default (boardId, userId, pcId) => {
  const user = getUser(boardId, userId);
  return user[pcId];
};
