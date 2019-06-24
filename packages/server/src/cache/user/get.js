/* eslint-disable import/no-cycle */
import users from './cache';
import db from '../../db';
import { findBoardDetail, findBlogDetail } from '../../api';

export default async function get(id) {
  const res = users.get(id);
  if (res) {
    return res;
  }

  const userData = await db.execute(async ({ find, findOne }) => {

    const user = await find('User', { id });

    const notification = await find('Notification', { userId: id });

    const userDetail = await find('UserDetail', { userId: id });

    const boardMember = await find('BoardMember', { tuserId: id });

    const board = await find('Board', { userId: id });

    const boardPromises = [];

    boardMember.forEach(bm => boardPromises.push(findOne('Board', { id: bm.boardId })));

    const allBoards = await Promise.all(boardPromises);

    // console.log('all board', allBoards);

    const boardDetailsPromises = [];

    [...board, ...boardMember].forEach((b) => {
      const bid = b.boardId || b.id;
      // console.log(bid);
      boardDetailsPromises.push(findBoardDetail(bid));
    });

    const boardUserPromises = [];

    [...board, ...allBoards].forEach((b) => {
      boardUserPromises.push(find('BoardMember', { boardId: b.id }));
      boardUserPromises.push(find('Board', { id: b.id }));
    });

    const allBoardMembers = await Promise.all(boardUserPromises);

    // console.log('all Board Member', allBoardMembers.flat());

    const allBoardUserPromises = [];
    allBoardMembers.flat().forEach(bm => allBoardUserPromises.push(findOne('User', { id: bm.tuserId || bm.userId })));

    const allBoardUser = await Promise.all(allBoardUserPromises);

    const uniqUsers = [];
    allBoardUser.forEach((obj) => {
      if (uniqUsers.length === 0) {
        uniqUsers.push(obj);
      }
      let av = false;
      for (let i = 0; i < uniqUsers.length; i += 1) {
        if (obj.id === uniqUsers[i].id) {
          av = false;
          break;
        } else {
          av = true;
        }
      }
      if (av) {
        uniqUsers.push(obj);
      }
    });

    const boardUserDetailsPromises = [];

    uniqUsers.forEach(bm => boardUserDetailsPromises.push(findOne('UserDetail', { userId: bm.id })));

    const allBoardUserDetails = await Promise.all(boardUserDetailsPromises);

    const allUser = uniqUsers.map(u => ({ id: u.id, firstName: u.firstName, email: u.email, activeStatus: null }));

    // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
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
      user: allUser,
      userDetail: allBoardUserDetails,
      board: [...board, ...allBoards],
      boardMember,
      boardColumn,
      boardColumnCard,
      boardColumnCardAttachment,
      boardColumnCardComment,
      boardColumnCardDescription,
      blog,
      blogDetail,
      blogComment,
      blogLike,
      notification,
    };
    return userDataRes;
  });
  users.set(id, userData);
  return userData;
}
