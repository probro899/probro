'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('../../cache/database/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flat = arr => {
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

exports.default = boardId => {
  // console.log('findBoard details board id', boardId);
  const allDbBoardColumn = _cache2.default.get('BoardColumn');
  const allDbBoardColumnCard = _cache2.default.get('BoardColumnCard');
  const allDbBoardColumnCardAttachment = _cache2.default.get('BoardColumnCardAttachment');
  const allDbBaordColumnCardComment = _cache2.default.get('BoardColumnCardComment');
  const allDbBoardColumnCardDescription = _cache2.default.get('BoardColumnCardDescription');
  const allDbBoardColumnCardTag = _cache2.default.get('BoardColumnCardTag');

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
    boardColumnCardTag
  };
};