'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _updateUserCache = require('../../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function copyBoardColumnCard(record) {
  // console.log('copyBoardColumnCard called', record);
  const { card, description, attachments, tags, columnId } = record;
  const { session } = this;
  delete card.id;
  delete description.id;
  attachments.forEach(d => delete d.id);
  tags.forEach(t => delete t.id);

  const addCardRes = await _add2.default.call(this, 'BoardColumnCard', _extends({}, card, { boardColumnId: parseInt(columnId, 10) }));
  await (0, _updateUserCache2.default)({ BoardColumnCard: _extends({}, card, { id: addCardRes, boardColumnId: parseInt(columnId, 10) }) }, session, 'add');
  const addCardDescriptionRes = await _add2.default.call(this, 'BoardColumnCardDescription', _extends({}, description, { boardColumnCardId: addCardRes }));
  await (0, _updateUserCache2.default)({ BoardColumnCardDescription: _extends({}, description, { boardColumnCardId: addCardRes, id: addCardDescriptionRes }) }, session, 'add');
  const attachmentPromises = [];
  attachments.forEach(at => attachmentPromises.push(_add2.default.call(this, 'BoardColumnCardAttachment', _extends({}, at, { boardColumnCardId: addCardRes }))));
  const attachmentAllRes = await Promise.all(attachmentPromises);
  const attachmentValues = Object.values(attachments).map((at, idx) => _extends({}, at, { boardColumnCardId: addCardRes, id: attachmentAllRes[idx] }));
  attachmentValues.forEach(at => (0, _updateUserCache2.default)({ BoardColumnCardAttachment: at }, session, 'add'));
  const tagsPromises = [];
  tags.forEach(t => tagsPromises.push(_add2.default.call(this, 'BoardColumnCardTag', _extends({}, t, { boardColumnCardId: addCardRes }))));
  const tagsAllRes = await Promise.all(tagsPromises);
  const tagsValues = Object.values(tags).map((at, idx) => _extends({}, at, { boardColumnCardId: addCardRes, id: tagsAllRes[idx] }));
  tagsValues.forEach(tg => (0, _updateUserCache2.default)({ BoardColumnCardTag: tg }, session, 'add'));
}
exports.default = copyBoardColumnCard;