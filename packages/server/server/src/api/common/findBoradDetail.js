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
  try {
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
    const finalBoardColumnCard = flat(boardColumnCard).map((t) => {
      return {
        ...t,
        noOfComment: boardColumnCardCommentWithuser.filter(tc => tc.boardColumnCardId === t.id).length,
        noOfAttachment: boardColumnCardAttachmentWithUser.filter(ta => ta.boardColumnCardId === t.id).length,
        description: boardColumnCardDescription.find(td => td.boardColumnCardId === t.id),
      };
    });
    return {
      boardColumn,
      boardColumnCard: finalBoardColumnCard,
      boardColumnCardAttachment: boardColumnCardAttachmentWithUser,
      boardColumnCardComment: boardColumnCardCommentWithuser,
      boardColumnCardDescription,
      boardColumnCardTag,
      boardMember,
    };
  } catch (e) {
    console.error('Error in findBoardDetails', e)
  }
  
};
