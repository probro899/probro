'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

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

exports.default = async boardId => {
  // console.log('findBoard details board id', boardId);
  const res = await _db2.default.execute(async ({ find }) => {

    const boardColumn = await find('BoardColumn', { boardId });
    console.log();
    const columnCardPromise = [];
    boardColumn.forEach(b => columnCardPromise.push(find('BoardColumnCard', { boardColumnId: b.id })));
    const boardColumnCard = await Promise.all(columnCardPromise);
    // console.log('boardColumnCard data', boardColumnCard);
    const boardColumnCardMap = flat(boardColumnCard.map(a => a.map(o => o.id)));

    const boardColumnCardAttachmentPromises = [];
    const boardColumnCardCommentPromises = [];
    const boardColumnCardDescriptionPromises = [];

    boardColumnCardMap.forEach(id => {
      boardColumnCardAttachmentPromises.push(find('BoardColumnCardAttachment', { boardColumnCardId: id }));
      boardColumnCardCommentPromises.push(find('BoardColumnCardComment', { boardColumnCardId: id }));
      boardColumnCardDescriptionPromises.push(find('BoardColumnCardDescription', { boardColumnCardId: id }));
    });

    const boardColumnCardAttachment = await Promise.all(boardColumnCardAttachmentPromises);
    const boardColumnCardComment = await Promise.all(boardColumnCardCommentPromises);
    const boardColumnCardDescription = await Promise.all(boardColumnCardDescriptionPromises);

    return {
      boardColumn,
      boardColumnCard,
      boardColumnCardAttachment,
      boardColumnCardComment,
      boardColumnCardDescription
    };
  });
  return res;
};