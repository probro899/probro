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
    const allTaskParticipant = cacheDatabase.get('TaskParticipant');
    const allDbBoardMember = cacheDatabase.get('BoardMember').filter(bm => bm.boardId === boardId && !bm.deleteStatus);
    const boardMember = allDbBoardMember.map(bm => ({ ...bm, user: findUserDetails(bm.tuserId) }));
    const boardColumn = allDbBoardColumn.filter(bc => bc.boardId === boardId);

    const boardColumnCard = boardColumn.map(bc => allDbBoardColumnCard.filter(bcc => bcc.boardColumnId === bc.id));
    // console.log('boardColumnCard data', boardColumnCard);
    const refCards = [];
    const boardColumnCardMap = flat(boardColumnCard.map(a => a.map((o) => {
      if (o.refId) {
        refCards.push(o);
      }
      return o.id;
    })));

    const boardColumnCardAttachment = flat(boardColumnCardMap.map(id => allDbBoardColumnCardAttachment.filter(bcca => bcca.boardColumnCardId === id)));
    const boardColumnCardComment = flat(boardColumnCardMap.map(id => allDbBaordColumnCardComment.filter(bccc => bccc.boardColumnCardId === id)));
    const boardColumnCardDescription = flat(boardColumnCardMap.map(id => allDbBoardColumnCardDescription.filter(bccd => bccd.boardColumnCardId === id)));
    const boardColumnCardTag = flat(boardColumnCardMap.map(id => allDbBoardColumnCardTag.filter(bcct => bcct.boardColumnCardId === id)));
    const taskParticipant = flat(boardColumnCardMap.map(id => allTaskParticipant.filter(tp => tp.taskId === id)));

    const boardColumnCardAttachmentWithUser = boardColumnCardAttachment.map(a => ({ ...a, user: findUserDetails(a.userId) }));
    const boardColumnCardCommentWithuser = boardColumnCardComment.map(c => ({ ...c, user: findUserDetails(c.userId) }));
 
    // getting description from refCard if current ref does not have any description
    const boardColumnCardRefDescription = refCards.filter(rc => !boardColumnCardDescription.find(rd => rd.boardColumnCardId === rc.id))
      .map((refc, idx) => {
        return { ...allDbBoardColumnCardDescription.find(bccd => bccd.boardColumnCardId === refc.refId), boardColumnCardId: refc.id, id: `ref-${idx}` };
      })
      .filter(d => d.title);
    const finalCardDescriptions = [...boardColumnCardRefDescription, ...boardColumnCardDescription];

    // getting attachemnts from refCard if current ref does not have any attachemnts
    const boardColumnCardRefAttachment = flat(refCards
      .map((refc, idx) => {
        return allDbBoardColumnCardAttachment.filter(bccd => bccd.boardColumnCardId === refc.refId).map((at, atidx) => ({ ...at, boardColumnCardId: refc.id, id: `ref-${atidx}`, user: findUserDetails(at.userId)}));
      }));
    const finalCardAttachments = [...boardColumnCardRefAttachment, ...boardColumnCardAttachmentWithUser];

    const finalBoardColumnCard = flat(boardColumnCard).map((t) => {
      return {
        ...t,
        noOfComment: boardColumnCardCommentWithuser.filter(tc => tc.boardColumnCardId === t.id).length,
        noOfAttachment: finalCardAttachments.filter(ta => ta.boardColumnCardId === t.id).length,
        description: finalCardDescriptions.find(td => td.boardColumnCardId === t.id),
      };
    });

    return {
      boardColumn,
      boardColumnCard: finalBoardColumnCard,
      boardColumnCardAttachment: finalCardAttachments,
      boardColumnCardComment: boardColumnCardCommentWithuser,
      boardColumnCardDescription: finalCardDescriptions,
      boardColumnCardTag,
      boardMember,
      taskParticipant,
    };
  } catch (e) {
    console.error('Error in findBoardDetails', e);
  }
};
