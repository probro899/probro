/* eslint-disable import/no-cycle */
import users from './cache';
import db from '../../db';
import { getUserMessgeDetails, getBlogDetails, getUserConnectionListDetails, getAllBoardDetails, getUserDetails, getNotificationDetails } from './helper-functions';
import flat from '../../api/flat';

export default async function get(id) {
  // console.log('id in getUser', id);
  const res = users.get(id);
  if (res) {
    return res;
  }

  const userData = await db.execute(async ({ find, findOne }) => {

    // ******************* User Messages ***************************************************************
    const userMessageDetails = await getUserMessgeDetails(find, id);
    // ************************************************************************************************

    // ******************* User ConnectionList **********************************************************
    const userConnectionListDetails = await getUserConnectionListDetails(find, id);
    // ***************************************************************************************************

    // ******************** all Blog details *************************************************************
    const blogDetails = await getBlogDetails(find, findOne, id);
    // ***************************************************************************************************

    // ********************* getting all Board Details ***************************************************
    const boardDetails = await getAllBoardDetails(find, findOne, id);
    // *****************************************************************************************************

    // ************ getting notification details ***********************************************************
    const userNotifications = await getNotificationDetails(find, id, boardDetails);
    // *****************************************************************************************************

    // **********************************getting all UserDetails ******************************************
    const userDetails = await getUserDetails(find, findOne, id, userConnectionListDetails, blogDetails, boardDetails);
    // ***************************************************************************************************

    const userDataRes = {
      User: userDetails.allUser,
      UserDetail: userDetails.allUserDetailsList,
      UserEducation: userDetails.UserEducation,
      UserWorkExperience: userDetails.UserWorkExperience,
      UserPortal: userDetails.UserPortal,
      UserSkill: userDetails.UserSkill,
      UserCarrierInterest: userDetails.UserCarrierInterest,

      Board: boardDetails.allBoards,
      BoardMember: flat(boardDetails.allBoardMembers),
      BoardColumn: boardDetails.BoardColumn,
      BoardColumnCard: boardDetails.BoardColumnCard,
      BoardColumnCardAttachment: boardDetails.BoardColumnCardAttachment,
      BoardColumnCardComment: boardDetails.BoardColumnCardComment,
      BoardColumnCardDescription: boardDetails.BoardColumnCardDescription,
      BoardColumnCardTag: boardDetails.BoardColumnCardTag,
      BoardMessage: flat(boardDetails.BoardMessage),
      BoardMessageSeenStatus: flat(boardDetails.BoardMessageSeenStatus),

      Blog: [...blogDetails.allBlogs, ...blogDetails.newBlogPublish],
      BlogComment: blogDetails.BlogComment,
      BlogLike: blogDetails.BlogLike,
      Notification: userNotifications.Notification,
      NotificationReadStatus: userNotifications.notificationReadstatus,


      UserConnection: userConnectionListDetails.connectionList,
      UserMessage: userMessageDetails.userMessages,
      UserMessageSeenStatus: flat(userMessageDetails.userMessageSeenStatus),
      allAssociateBlogsId: blogDetails.allAssociateBlogsId,

    };
    return userDataRes;
  });
  users.set(id, userData);
  return userData;
}
