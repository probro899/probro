import setUser from './setUser';
import getUser from './getUser';

export default (boardId, userId, pcId, payload) => {
  const user = getUser(boardId, userId);
  setUser(boardId, userId, { ...user, [pcId]: payload });
};
