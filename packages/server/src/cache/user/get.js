import users from './cache';
import db from '../../db';
import { findBoardDetail } from '../../api';

export default async function get(id) {
  const res = users.get(id);
  if (res) {
    return res;
  }

  const userData = await db.execute(async ({ find }) => {

    const user = await find('User', { id });

    const userDetail = await find('UserDetail', { userId: id });

    const board = await find('Board', { userId: id });

    const boardDetailsPromises = [];

    board.forEach((b) => {
      boardDetailsPromises.push(findBoardDetail(b.id));
    });

    const boardDetails = await Promise.all(boardDetailsPromises);
    const boardColumn = boardDetails.map(obj => obj.boardColumn).flat();
    const boardColumnCard = boardDetails.map(obj => obj.boardColumnCard).flat();
    const boardColumnCardAttachment = boardDetails.map(obj => obj.boardColumnCardAttachment).flat();
    const boardColumnCardComment = boardDetails.map(obj => obj.boardColumnCardComment).flat();
    const boardColumnCardDescription = boardDetails.map(obj => obj.boardColumnCardDescription);

    const userDataRes = {
      user,
      userDetail,
      board,
      boardColumn,
      boardColumnCard,
      boardColumnCardAttachment,
      boardColumnCardComment,
      boardColumnCardDescription,
    };
    return userDataRes;
  });
  users.set(id, userData);
  return userData;
}
