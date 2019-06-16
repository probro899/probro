/* eslint-disable import/no-cycle */
import users from './cache';
import db from '../../db';
import { findBoardDetail, findBlogDetail } from '../../api';

export default async function get(id) {
  const res = users.get(id);
  if (res) {
    return res;
  }

  const userData = await db.execute(async ({ find }) => {

    const user = await find('User', { id });

    const userDetail = await find('UserDetail', { userId: id });

    const board = await find('Board', { userId: id, joinStatus: '1' });

    const boardDetailsPromises = [];

    board.forEach((b) => {
      boardDetailsPromises.push(findBoardDetail(b.id));
    });

    const boardDetails = await Promise.all(boardDetailsPromises);
    // console.log('boardDetails', JSON.stringify(boardDetails));
    const boardColumn = boardDetails.map(obj => obj.boardColumn).flat();
    const boardColumnCard = boardDetails.map(obj => obj.boardColumnCard).flat().flat();
    const boardColumnCardAttachment = boardDetails.map(obj => obj.boardColumnCardAttachment).flat().flat();
    const boardColumnCardComment = boardDetails.map(obj => obj.boardColumnCardComment).flat().flat();
    // console.log('board columnCardAttachment', boardColumnCardComment);
    const boardColumnCardDescription = boardDetails.map(obj => obj.boardColumnCardDescription).flat().flat();

    const blog = await find('Blog', { userId: id });

    const blogDetailsPromises = [];

    blog.forEach((b) => {
      blogDetailsPromises.push(findBlogDetail(b.id));
    });

    const blogDetails = await Promise.all(blogDetailsPromises);
    const blogDetail = blogDetails.map(obj => obj.blogDetail).flat();
    const blogComment = blogDetails.map(obj => obj.blogComment).flat();
    const blogLike = blogDetails.map(obj => obj.blogLike).flat();

    const userDataRes = {
      user,
      userDetail,
      board,
      boardColumn,
      boardColumnCard,
      boardColumnCardAttachment,
      boardColumnCardComment,
      boardColumnCardDescription,
      blog,
      blogDetail,
      blogComment,
      blogLike,
    };
    return userDataRes;
  });
  users.set(id, userData);
  return userData;
}
