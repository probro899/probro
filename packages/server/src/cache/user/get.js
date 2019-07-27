/* eslint-disable import/no-cycle */
import users from './cache';
import db from '../../db';
import { findBoardDetail, findBlogDetail } from '../../api';

export default async function get(id) {
  // console.log('id in getUser', id);
  const res = users.get(id);
  if (res) {
    return res;
  }

  const userData = await db.execute(async ({ find, findOne }) => {

    const user = await find('User', { id });
    delete user[0].password;
    const Notification = await find('Notification', { userId: id });

    const userDetail = await find('UserDetail', { userId: id });

    const boardMember = await find('BoardMember', { tuserId: id });

    const Board = await find('Board', { userId: id });

    const boardPromises = [];

    boardMember.forEach(bm => boardPromises.push(findOne('Board', { id: bm.boardId })));

    const allBoards = await Promise.all(boardPromises);

    // console.log('all board', allBoards);

    const boardDetailsPromises = [];

    allBoards.forEach((b) => {
      boardDetailsPromises.push(findBoardDetail(b.id));
    });

    const boardUserPromises = [];

    allBoards.forEach((b) => {
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

    const allBoardUserDetails = allBoards.length === 0 ? userDetail : await Promise.all(boardUserDetailsPromises);

    const allUser = allBoards.length === 0 ? user : uniqUsers.map(u => ({ id: u.id, firstName: u.firstName, email: u.email, lastName: u.lastName, activeStatus: null }));

    // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
    const boardDetails = await Promise.all(boardDetailsPromises);
    // console.log('boardDetails', JSON.stringify(boardDetails));
    const BoardColumn = boardDetails.map(obj => obj.boardColumn).flat();
    const BoardColumnCard = boardDetails.map(obj => obj.boardColumnCard).flat().flat();
    const BoardColumnCardAttachment = boardDetails.map(obj => obj.boardColumnCardAttachment).flat().flat();
    const BoardColumnCardComment = boardDetails.map(obj => obj.boardColumnCardComment).flat().flat();
    // console.log('board columnCardAttachment', boardColumnCardComment);
    const BoardColumnCardDescription = boardDetails.map(obj => obj.boardColumnCardDescription).flat().flat();

    const Blog = await find('Blog', { userId: id });

    const blogDetailsPromises = [];

    Blog.forEach((b) => {
      blogDetailsPromises.push(findBlogDetail(b.id));
    });

    const blogDetails = await Promise.all(blogDetailsPromises);
    // const BlogDetail = blogDetails.map(obj => obj.blogDetail).flat();
    const BlogComment = blogDetails.map(obj => obj.blogComment).flat();
    const BlogLike = blogDetails.map(obj => obj.blogLike).flat();

    const userDataRes = {
      User: allUser,
      UserDetail: allBoardUserDetails,
      Board: allBoards,
      BoardMember: allBoardMembers.flat(),
      BoardColumn,
      BoardColumnCard,
      BoardColumnCardAttachment,
      BoardColumnCardComment,
      BoardColumnCardDescription,
      Blog,
      // BlogDetail,
      BlogComment,
      BlogLike,
      Notification,
    };
    return userDataRes;
  });
  users.set(id, userData);
  return userData;
}
