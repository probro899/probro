'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _api = require('../../api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = async function get(id) {
  // console.log('id in getUser', id);
  const res = _cache2.default.get(id);
  if (res) {
    return res;
  }

  const userData = await _db2.default.execute(async ({ find, findOne }) => {
    const user = await find('User', { id });
    delete user[0].password;
    const Notification = await find('Notification', { userId: id });
    const userDetail = await find('UserDetail', { userId: id });

    // ******************* User Messages *****************************************************************
    const tuserMessage = await find('UserMessage', { tuserId: id });
    const fuserMessage = await find('UserMessage', { fuserId: id });
    const userMessages = [...fuserMessage, ...tuserMessage];
    // ************************************************************************************************

    // ******************* User ConnectionList **********************************************************
    let connectionListMid = [];
    let connectionListUserId = [];
    if (userDetail.length === 1) {
      connectionListMid = await find('UserConnection', { mId: user[0].id });
      connectionListUserId = await find('UserConnection', { userId: user[0].id });
    }
    const connectionList = [...connectionListMid, ...connectionListUserId];
    const allConnectionUserList = _lodash2.default.uniq(connectionList.map(obj => [obj.mId, obj.userId]).flat());
    // console.log('allConnecitonUserList', allConnectionUserList);
    // ***************************************************************************************************

    // ******************** all Blog details *************************************************************
    const Blog = await find('Blog', { userId: id });
    const allLike = await find('BlogLike', { userId: id });
    const allComments = await find('BlogComment', { userId: id });
    const BlogPublish = await find('Blog', { saveStatus: 'publish' });
    console.log('all blog data', Blog, allLike, allComments, BlogPublish);
    const allAssociateBlogsId = _lodash2.default.uniq([...allComments.map(obj => obj.blogId), ...allLike.map(obj => obj.blogId), ...Blog.map(obj => obj.id), ...BlogPublish.map(obj => obj.id)]);
    console.log('allAssociated Blog Ids', allAssociateBlogsId);
    const blogDetailsPromises = [];
    const allBlogsPromises = [];
    allAssociateBlogsId.forEach(bid => {
      blogDetailsPromises.push((0, _api.findBlogDetail)(bid));
      allBlogsPromises.push(findOne('Blog', { id: bid }));
    });

    const blogDetails = await Promise.all(blogDetailsPromises);
    const allBlogs = await Promise.all(allBlogsPromises);
    console.log('allBlogs', allBlogs);

    const newBlogPublish = BlogPublish.filter(b => !allBlogs.find(bn => b.id === bn.id));
    // const BlogDetail = blogDetails.map(obj => obj.blogDetail).flat();
    const BlogComment = blogDetails.map(obj => obj.blogComment).flat();
    const BlogLike = blogDetails.map(obj => obj.blogLike).flat();
    const allBlogUsers = [...allBlogs, ...newBlogPublish, ...BlogLike, ...BlogComment].map(b => b.userId);
    // console.log('allBlogUsers', asllBlogUsers);
    // ***************************************************************************************************

    const BoardMember = await find('BoardMember', { tuserId: id });
    const UserWorkExperience = await find('UserWorkExperience', { userId: id });
    const UserEducation = await find('UserEducation', { userId: id });
    const UserSkill = await find('UserSkill', { userId: id });
    const UserPortal = await find('UserPortal', { userId: id });
    const Board = await find('Board', { userId: id });

    const boardPromises = [];
    BoardMember.forEach(bm => boardPromises.push(findOne('Board', { id: bm.boardId })));
    const allBoardsTemp = await Promise.all(boardPromises);
    const allBoards = allBoardsTemp.filter(b => b);
    // console.log('all board', allBoards);

    const boardMessagePromises = [];
    allBoards.forEach(b => boardMessagePromises.push(find('BoardMessage', { boardId: b.id })));
    const BoardMessage = await Promise.all(boardMessagePromises);
    // console.log('BoardMessage', BoardMessage);

    const boardDetailsPromises = [];
    allBoards.forEach(b => {
      boardDetailsPromises.push((0, _api.findBoardDetail)(b.id));
    });

    const boardUserPromises = [];
    allBoards.forEach(b => {
      boardUserPromises.push(find('BoardMember', { boardId: b.id }));
      // boardUserPromises.push(find('Board', { id: b.id }));
    });

    const allBoardMembers = await Promise.all(boardUserPromises);
    // console.log('all Board Member', allBoardMembers.flat());
    const allBoardUserList = _lodash2.default.uniq(allBoardMembers.flat().map(obj => obj.tuserId));
    const allBoardUserPromises = [];
    _lodash2.default.uniq([...allBoardUserList, ...allConnectionUserList, ...allBlogUsers, user[0].id]).forEach(uid => allBoardUserPromises.push(findOne('User', { id: uid })));
    const allUserList = await Promise.all(allBoardUserPromises);

    const boardUserDetailsPromises = [];
    _lodash2.default.uniq([...allBoardUserList, ...allConnectionUserList, ...allBlogUsers, user[0].id]).forEach(uid => boardUserDetailsPromises.push(findOne('UserDetail', { userId: uid })));
    const allUserDetailsList = await Promise.all(boardUserDetailsPromises);
    const allUser = allUserList.map(u => ({ id: u.id, firstName: u.firstName, email: u.email, lastName: u.lastName, activeStatus: null }));
    // console.log('allUser', allUser);
    // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
    const boardDetails = await Promise.all(boardDetailsPromises);
    // console.log('boardDetails', JSON.stringify(boardDetails));
    const BoardColumn = boardDetails.map(obj => obj.boardColumn).flat();
    const BoardColumnCard = boardDetails.map(obj => obj.boardColumnCard).flat().flat();
    const BoardColumnCardAttachment = boardDetails.map(obj => obj.boardColumnCardAttachment).flat().flat();
    const BoardColumnCardComment = boardDetails.map(obj => obj.boardColumnCardComment).flat().flat();
    // console.log('board columnCardAttachment', boardColumnCardComment);
    const BoardColumnCardDescription = boardDetails.map(obj => obj.boardColumnCardDescription).flat().flat();
    // console.log('connection list', [allBlogs, newBlogPublish]);
    const userDataRes = {
      User: allUser,
      UserDetail: allUserDetailsList,
      Board: allBoards,
      BoardMember: allBoardMembers.flat(),
      BoardColumn,
      BoardColumnCard,
      BoardColumnCardAttachment,
      BoardColumnCardComment,
      BoardColumnCardDescription,
      Blog: [...allBlogs, ...newBlogPublish],
      BlogComment,
      BlogLike,
      Notification,
      UserEducation,
      UserWorkExperience,
      UserPortal,
      UserSkill,
      BoardMessage: BoardMessage.flat(),
      UserConnection: connectionList,
      UserMessage: userMessages,
      allAssociateBlogsId

    };
    return userDataRes;
  });
  _cache2.default.set(id, userData);
  return userData;
};