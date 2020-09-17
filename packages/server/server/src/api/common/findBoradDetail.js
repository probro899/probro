import cacheDatabase from '../../cache/database/cache';
import findUserDetails from './findUserDetails';

const flat = (arr) => {
  const flatArray = arr.reduce((t, a) => {
    if (Array.isArray(a)) {
      a.forEach(am => t.push(am));
    } else {
      t.push(a);
    }
    return t;
  }, []);
  return flatArray;
};

export default (boardId) => {
  // console.log('findBoard details board id', boardId);
  const allDbBoardColumn = cacheDatabase.get('BoardColumn');
  const allDbBoardColumnCard = cacheDatabase.get('BoardColumnCard');
  const allDbBoardColumnCardAttachment = cacheDatabase.get('BoardColumnCardAttachment');
  const allDbBaordColumnCardComment = cacheDatabase.get('BoardColumnCardComment');
  const allDbBoardColumnCardDescription = cacheDatabase.get('BoardColumnCardDescription');
  const allDbBoardColumnCardTag = cacheDatabase.get('BoardColumnCardTag');
  const allDbBoardMember = cacheDatabase.get('BoardMember').filter(bm => bm.boardId === boardId && !bm.deleteStatus);
  const boardMember = allDbBoardMember.map(bm => ({ ...bm, user: findUserDetails(bm.tuserId) }));
  const boardColumn = allDbBoardColumn.filter(bc => bc.boardId === boardId);

  const boardColumnCard = boardColumn.map(bc => allDbBoardColumnCard.filter(bcc => bcc.boardColumnId === bc.id));
  // console.log('boardColumnCard data', boardColumnCard);
  const boardColumnCardMap = flat(boardColumnCard.map(a => a.map(o => o.id)));

  const boardColumnCardAttachment = flat(boardColumnCardMap.map(id => allDbBoardColumnCardAttachment.filter(bcca => bcca.boardColumnCardId === id)));
  const boardColumnCardComment = flat(boardColumnCardMap.map(id => allDbBaordColumnCardComment.filter(bccc => bccc.boardColumnCardId === id)));
  const boardColumnCardDescription = flat(boardColumnCardMap.map(id => allDbBoardColumnCardDescription.filter(bccd => bccd.boardColumnCardId === id)));
  const boardColumnCardTag = flat(boardColumnCardMap.map(id => allDbBoardColumnCardTag.filter(bcct => bcct.boardColumnCardId === id)));

  const boardColumnCardAttachmentWithUser = boardColumnCardAttachment.map(a => ({ ...a, user: findUserDetails(a.userId) }));
  const boardColumnCardCommentWithuser = boardColumnCardComment.map(c => ({ ...c, user: findUserDetails(c.userId) }));
  return {
    boardColumn,
    boardColumnCard: flat(boardColumnCard),
    boardColumnCardAttachment: boardColumnCardAttachmentWithUser,
    boardColumnCardComment: boardColumnCardCommentWithuser,
    boardColumnCardDescription,
    boardColumnCardTag,
    boardMember,
  };
};
