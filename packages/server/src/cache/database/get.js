/* eslint-disable import/no-cycle */
import { getUserMessgeDetails, getBlogDetails, getUserConnectionListDetails, getAllBoardDetails, getUserDetails, getNotificationDetails } from './helper-functions';
import flat from '../../api/flat';

export default function get(id, session) {
  // console.log('id in getUser', id);

  // ******************* User Messages ***************************************************************
  const userMessageDetails = getUserMessgeDetails(id);
  // console.log('user Message Details', userMessageDetails);
  // ************************************************************************************************

  // ******************* User ConnectionList **********************************************************
  const userConnectionListDetails = getUserConnectionListDetails(id);
  // console.log('userConnectionListDetails', userConnectionListDetails);
  // // ***************************************************************************************************

  // // ******************** all Blog details *************************************************************
  const blogDetails = getBlogDetails(id);
  // console.log('blogDetails', blogDetails);
  // // ***************************************************************************************************

  // // ********************* getting all Board Details ***************************************************
  const boardDetails = getAllBoardDetails(id, session);
  // console.log('allBoard Details', boardDetails);
  // // *****************************************************************************************************

  // // ************ getting notification details ***********************************************************
  const userNotifications = getNotificationDetails(id, boardDetails);
  // console.log('User notifications', userNotifications);
  // // *****************************************************************************************************

  // // **********************************getting all UserDetails ******************************************
  const userDetails = getUserDetails(id, userConnectionListDetails, blogDetails, boardDetails);
  // console.log('User details', userDetails);
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
  // users.set(id, userData);
  return userDataRes;
}
