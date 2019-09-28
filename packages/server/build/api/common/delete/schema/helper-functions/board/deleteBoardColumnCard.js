'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../../../../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function deleteBoardColumnCard(Delete, record) {
  // console.log('deleteBoardColumnCard', record);
  await _db2.default.execute(async ({ find }) => {
    const allboardColumnCardPromises = [];
    record.forEach(e => {
      allboardColumnCardPromises.push(find('BoardColumnCard', e));
    });

    const allboardColumnCardIdArr = await Promise.all(allboardColumnCardPromises);
    allboardColumnCardIdArr.flat().map(obj => obj.id).forEach(async cardId => {
      await Delete('BoardColumnCardAttachment', { boardColumnCardId: cardId });
      await Delete('BoardColumnCardComment', { boardColumnCardId: cardId });
      await Delete('BoardColumnCardDescription', { boardColumnCardId: cardId });
    });
  });
  record.forEach(async columnId => {
    await Delete('BoardColumnCard', columnId);
  });
};