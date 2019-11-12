/* eslint-disable import/no-cycle */
import lodash from 'lodash';
import users from './cache';
import db from '../../db';
import { findBoardDetail, findBlogDetail } from '../../api';

const flat = (arr) => {
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

    // ******************* User Messages *****************************************************************
    const tuserMessage = await find('UserMessage', { tuserId: id });
    const fuserMessage = await find('UserMessage', { fuserId: id });
    const userMessages = [...fuserMessage, ...tuserMessage];
    const userMessageSeenStatusPromises = [];
    userMessages.forEach(um => userMessageSeenStatusPromises.push(find('UserMessageSeenStatus', { umId: um.id })));
    const userMessageSeenStatus = await Promise.all(userMessageSeenStatusPromises);

    // ************************************************************************************************

    // ******************* User ConnectionList **********************************************************
    let connectionListMid = [];
    let connectionListUserId = [];
    connectionListMid = await find('UserConnection', { mId: user[0].id });
    connectionListUserId = await find('UserConnection', { userId: user[0].id });
    const connectionList = [...connectionListMid, ...connectionListUserId];
    const allConnectionUserList = lodash.uniq(flat(connectionList.map(obj => [obj.mId, obj.userId])));
    // console.log('allConnecitonUserList', allConnectionUserList);
    // ***************************************************************************************************

    // ******************** all Blog details *************************************************************
    const Blog = await find('Blog', { userId: id });
    const allLike = await find('BlogLike', { userId: id });
    const allComments = await find('BlogComment', { userId: id });
    const BlogPublish = await find('Blog', { saveStatus: 'publish' });
    // console.log('all blog data', Blog, allLike, allComments, BlogPublish);
    const allAssociateBlogsId = lodash.uniq([...allComments.map(obj => obj.blogId), ...allLike.map(obj => obj.blogId), ...Blog.map(obj => obj.id), ...BlogPublish.map(obj => obj.id)]);
    // console.log('allAssociated Blog Ids', allAssociateBlogsId);
    const blogDetailsPromises = [];
    const allBlogsPromises = [];
    allAssociateBlogsId.forEach((bid) => {
      blogDetailsPromises.push(findBlogDetail(bid));
      allBlogsPromises.push(findOne('Blog', { id: bid }));
    });

    const blogDetails = await Promise.all(blogDetailsPromises);
    const allBlogs = await Promise.all(allBlogsPromises);
    // console.log('allBlogs', allBlogs);

    const newBlogPublish = BlogPublish.filter(b => !allBlogs.find(bn => b.id === bn.id));
    // const BlogDetail = blogDetails.map(obj => obj.blogDetail).flat();
    const BlogComment = flat(blogDetails.map(obj => obj.blogComment));
    const BlogLike = flat(blogDetails.map(obj => obj.blogLike));
    const allBlogUsers = [...allBlogs, ...newBlogPublish, ...BlogLike, ...BlogComment].map(b => b.userId);
    // console.log('allBlogUsers', asllBlogUsers);
    // ***************************************************************************************************

    const BoardMember = await find('BoardMember', { tuserId: id });
    const UserWorkExperience = await find('UserWorkExperience', { userId: id });
    const UserEducation = await find('UserEducation', { userId: id });
    const UserSkill = await find('UserSkill', { userId: id });
    const UserPortal = await find('UserPortal', { userId: id });
    const UserCarrierInterest = await find('UserCarrierInterest', { userId: id });
    const Board = await find('Board', { userId: id });

    const boardPromises = [];
    BoardMember.forEach(bm => boardPromises.push(findOne('Board', { id: bm.boardId })));
    const allBoardsTemp = await Promise.all(boardPromises);
    const allBoards = allBoardsTemp.filter(b => b);
    // console.log('all board', allBoards);

    const boardMessagePromises = [];
    allBoards.forEach(b => boardMessagePromises.push(find('BoardMessage', { boardId: b.id })));
    const BoardMessage = await Promise.all(boardMessagePromises);
    const boardMessageSeenStatusPromises = [];
    flat(BoardMessage).forEach(msg => boardMessageSeenStatusPromises.push(find('BoardMessageSeenStatus', { bmId: msg.id })));
    const BoardMessageSeenStatus = await Promise.all(boardMessageSeenStatusPromises);
    // console.log('BoardMessage', BoardMessage);

    const boardDetailsPromises = [];
    allBoards.forEach((b) => {
      boardDetailsPromises.push(findBoardDetail(b.id));
    });

    const boardUserPromises = [];
    allBoards.forEach((b) => {
      boardUserPromises.push(find('BoardMember', { boardId: b.id }));
      // boardUserPromises.push(find('Board', { id: b.id }));
    });

    const allBoardMembers = await Promise.all(boardUserPromises);
    // console.log('all Board Member', allBoardMembers.flat());
    const allBoardUserList = lodash.uniq(flat(allBoardMembers).map(obj => obj.tuserId));
    const allBoardUserPromises = [];
    lodash.uniq([...allBoardUserList, ...allConnectionUserList, ...allBlogUsers, user[0].id]).forEach(uid => allBoardUserPromises.push(findOne('User', { id: uid })));
    const allUserList = await Promise.all(allBoardUserPromises);

    const boardUserDetailsPromises = [];
    lodash.uniq([...allBoardUserList, ...allConnectionUserList, ...allBlogUsers, user[0].id]).forEach(uid => boardUserDetailsPromises.push(findOne('UserDetail', { userId: uid })));
    const allUserDetailsList = (await Promise.all(boardUserDetailsPromises)).filter(obj => obj);
    // console.log('all user details list', allUserDetailsList);
    const allUser = allUserList.map(u => ({ id: u.id, firstName: u.firstName, email: u.email, lastName: u.lastName, activeStatus: null }));
    // console.log('allUser', allUser);
    // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
    const boardDetails = await Promise.all(boardDetailsPromises);
    // console.log('boardDetails', JSON.stringify(boardDetails));
    const BoardColumn = flat(boardDetails.map(obj => obj.boardColumn));
    const BoardColumnCard = flat(flat(boardDetails.map(obj => obj.boardColumnCard)));
    const BoardColumnCardAttachment = flat(flat(boardDetails.map(obj => obj.boardColumnCardAttachment)));
    const BoardColumnCardComment = flat(flat(boardDetails.map(obj => obj.boardColumnCardComment)));
    // console.log('board columnCardAttachment', boardColumnCardComment);
    const BoardColumnCardDescription = flat(flat(boardDetails.map(obj => obj.boardColumnCardDescription)));
    const BoardColumnCardTag = flat(flat(boardDetails.map(obj => obj.boardColumnCardTag)));

    // console.log('connection list', [allBlogs, newBlogPublish]);
    // console.log('UserMessage', userMessages);
    const userDataRes = {
      User: allUser,
      UserDetail: allUserDetailsList,
      Board: allBoards,
      BoardMember: flat(allBoardMembers),
      BoardColumn,
      BoardColumnCard,
      BoardColumnCardAttachment,
      BoardColumnCardComment,
      BoardColumnCardDescription,
      BoardColumnCardTag,
      Blog: [...allBlogs, ...newBlogPublish],
      BlogComment,
      BlogLike,
      Notification,
      UserEducation,
      UserWorkExperience,
      UserPortal,
      UserSkill,
      UserCarrierInterest,
      BoardMessage: flat(BoardMessage),
      BoardMessageSeenStatus: flat(BoardMessageSeenStatus),
      UserConnection: connectionList,
      UserMessage: userMessages,
      UserMessageSeenStatus: flat(userMessageSeenStatus),
      allAssociateBlogsId,

    };
    return userDataRes;
  });
  users.set(id, userData);
  return userData;
}
