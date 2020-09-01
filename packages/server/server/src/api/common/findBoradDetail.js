import cacheDatabase from '../../cache/database/cache';

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

  const boardColumn = allDbBoardColumn.filter(bc => bc.boardId === boardId);

  const boardColumnCard = boardColumn.map(bc => allDbBoardColumnCard.filter(bcc => bcc.boardColumnId === bc.id));
  // console.log('boardColumnCard data', boardColumnCard);
  const boardColumnCardMap = flat(boardColumnCard.map(a => a.map(o => o.id)));

  const boardColumnCardAttachment = boardColumnCardMap.map(id => allDbBoardColumnCardAttachment.filter(bcca => bcca.boardColumnCardId === id));
  const boardColumnCardComment = boardColumnCardMap.map(id => allDbBaordColumnCardComment.filter(bccc => bccc.boardColumnCardId === id));
  const boardColumnCardDescription = boardColumnCardMap.map(id => allDbBoardColumnCardDescription.filter(bccd => bccd.boardColumnCardId === id));
  const boardColumnCardTag = boardColumnCardMap.map(id => allDbBoardColumnCardTag.filter(bcct => bcct.boardColumnCardId === id));

  return {
    boardColumn,
    boardColumnCard,
    boardColumnCardAttachment,
    boardColumnCardComment,
    boardColumnCardDescription,
    boardColumnCardTag,
  };
};
