import db from '../../../../../db';

export default async function deleteBoardColumnCard(Delete, record) {

  await db.execute(async ({ find }) => {
    const allboardColumnCardPromises = [];
    record.forEach((e) => {
      allboardColumnCardPromises.push(find('BoardColumnCard', e));
    });

    const allboardColumnCardIdArr = await Promise.all(allboardColumnCardPromises);
    allboardColumnCardIdArr.flat().map(obj => obj.id).forEach(async (cardId) => {
      await Delete('BoardColumnCardAttachment', { boardColumnCardId: cardId });
      await Delete('BoardColumnCardComment', { boardColumnCardId: cardId });
      await Delete('BoardColumnCardDescription', { boardColumnCardId: cardId });
    });
  });
  record.forEach(async (columnId) => {
    await Delete('BoardColumnCard', columnId);
  });
}
