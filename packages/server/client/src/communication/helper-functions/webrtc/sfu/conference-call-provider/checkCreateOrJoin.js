import store from '../../../../../store';

export default (connectionId) => {
  const { database, webRtc } = store.getState();
  const { isCallUpgraded } = webRtc;
  if (isCallUpgraded) {
    return { type: 'upgrade' };
  }
  if (database) {
    const board = Object.values(database.Board.byId).find(b => b.id === connectionId);
    if (board) {
      if (board.activeStatus) {
        const { joinToken, activeStatus } = board;
        return { type: 'join', joinToken, activeStatus };
      }
      return { type: 'create' };
    }
    throw ({ error: 'Board not found', errorCode: 104 });
  }
  throw ({ error: 'Database not found', errorCode: 105 });
};
