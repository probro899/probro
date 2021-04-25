import cacheDatabase from '../../../../../cache/database/cache';
import flat from '../../../../flat';

export default (id) => {
  try {
    const allDbBoardMembers = cacheDatabase.get('BoardMember');
    const allDbBoard = cacheDatabase.get('Board');
    const allDbBoardMessage = cacheDatabase.get('BoardMessage');
    const allDbBoardMessageSeenStatus = cacheDatabase.get('BoardMessageSeenStatus');

    const templatesBoards = allDbBoard.filter(b => b.type === 'template');
    const BoardMember = allDbBoardMembers.filter(bm => bm.tuserId === id && !bm.deleteStatus);
    const allBoardsTemp = BoardMember.map(bm => allDbBoard.find(b => b.id === bm.boardId));
    const allBoards = flat([...allBoardsTemp, ...templatesBoards]).filter(b => b).filter(b => b.deleteStatus !== 1);
    const BoardMessage = flat(allBoards.map(b => allDbBoardMessage.filter(bm => bm.boardId === b.id)));
    const BoardMessageSeenStatus = flat(flat(BoardMessage).map(bm => allDbBoardMessageSeenStatus.filter(bms => bms.bmId === bm.id)));
    return { BoardMessage, BoardMessageSeenStatus, allBoards };
  } catch (e) {
    console.error('Error in getBoardMessage', e);
  }
};
