import db from '../../db';

export default async (boardId) => {
  // console.log('findBoard details board id', boardId);
  const res = await db.execute(async ({ find }) => {

    const boardColumn = await find('BoardColumn', { boardId });
    const columnCardPromise = [];
    boardColumn.forEach(b => columnCardPromise.push(find('BoardColumnCard', { boardColumnId: b.id })));
    const boardColumnCard = await Promise.all(columnCardPromise);
    const boardColumnCardMap = boardColumnCard.map(a => a.map(o => o.id)).flat();

    const boardColumnCardAttachmentPromises = [];
    const boardColumnCardCommentPromises = [];
    const boardColumnCardDescriptionPromises = [];

    boardColumnCardMap.forEach((id) => {
      boardColumnCardAttachmentPromises.push(find('BoardColumnCardAttachment', { boardColumnCardId: id }));
      boardColumnCardCommentPromises.push(find('BoardColumnCardComment', { boardColumnCardId: id }));
      boardColumnCardDescriptionPromises.push(find('BoardColunCardDescription', { boardColumnCardId: id }));
    });

    const boardColumnCardAttachment = await Promise.all(boardColumnCardAttachmentPromises);
    const boardColumnCardComment = await Promise.all(boardColumnCardCommentPromises);
    const boardColumnCardDescription = await Promise.all(boardColumnCardDescriptionPromises);

    return {
      boardColumn,
      boardColumnCard,
      boardColumnCardAttachment,
      boardColumnCardComment,
      boardColumnCardDescription,
    };
  });
  return res;
};
