'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../../../../../db');

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

exports.default = async function deleteBoardColumnCard(Delete, record) {
  // console.log('deleteBoardColumnCard Helper', record);
  const { broadCastId } = record[0];
  await _db2.default.execute(async ({ find }) => {
    const allboardColumnCardPromises = [];
    record.forEach(e => {
      allboardColumnCardPromises.push(find('BoardColumnCard', { boardColumnId: e.boardColumnId }));
    });

    const allboardColumnCardIdArr = await Promise.all(allboardColumnCardPromises);
    flat(allboardColumnCardIdArr).map(obj => obj.id).forEach(async cardId => {
      await Delete('BoardColumnCardAttachment', { boardColumnCardId: cardId, broadCastId });
      await Delete('BoardColumnCardComment', { boardColumnCardId: cardId, broadCastId });
      await Delete('BoardColumnCardDescription', { boardColumnCardId: cardId, broadCastId });
    });
  });
  record.forEach(async rec => {
    await Delete('BoardColumnCard', rec);
  });
};