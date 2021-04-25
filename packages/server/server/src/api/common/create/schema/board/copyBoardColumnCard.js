/* eslint-disable import/no-cycle */
import updateUserCache from '../../../updateUserCache';
import add from '../../add';

async function copyBoardColumnCard(record) {
  try {
    // console.log('copyBoardColumnCard called', record);
  const { card, description, attachments, tags, columnId } = record;
  const { session } = this;
  delete card.id;
  attachments.forEach(d => delete d.id);
  tags.forEach(t => delete t.id);
 
  const addCardRes = await add.call(this, 'BoardColumnCard', { ...card, boardColumnId: parseInt(columnId, 10) });
  await updateUserCache({ BoardColumnCard: { ...card, id: addCardRes, boardColumnId: parseInt(columnId, 10) } }, session, 'add');
  if (description) {
    delete description.id;
    const addCardDescriptionRes = await add.call(this, 'BoardColumnCardDescription', { ...description, boardColumnCardId: addCardRes });
    await updateUserCache({ BoardColumnCardDescription: { ...description, boardColumnCardId: addCardRes, id: addCardDescriptionRes } }, session, 'add');
  }
  const attachmentPromises = [];
  attachments.forEach(at => attachmentPromises.push(add.call(this, 'BoardColumnCardAttachment', { ...at, boardColumnCardId: addCardRes })));
  const attachmentAllRes = await Promise.all(attachmentPromises);
  const attachmentValues = Object.values(attachments).map((at, idx) => ({ ...at, boardColumnCardId: addCardRes, id: attachmentAllRes[idx] }));
  attachmentValues.forEach(at => updateUserCache({ BoardColumnCardAttachment: at }, session, 'add'));
  const tagsPromises = [];
  tags.forEach(t => tagsPromises.push(add.call(this, 'BoardColumnCardTag', { ...t, boardColumnCardId: addCardRes })));
  const tagsAllRes = await Promise.all(tagsPromises);
  const tagsValues = Object.values(tags).map((at, idx) => ({ ...at, boardColumnCardId: addCardRes, id: tagsAllRes[idx] }));
  tagsValues.forEach(tg => updateUserCache({ BoardColumnCardTag: tg }, session, 'add'));
  } catch (e) {
    console.error('Error in copyBoardColumnCard', e)
  }
}
export default copyBoardColumnCard;
