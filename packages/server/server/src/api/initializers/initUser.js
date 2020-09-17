/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import userPresentorHelper from './isUserActiveStatus';
import activeInformer from './activeInformer';
import findUserDetails from '../common/findUserDetails';
import getChannelIds from '../common/getChannelIds';
import getChatList from '../common/get/message/helper-functions/getChatList';
import getUserMessages from '../common/get/message/helper-functions/getUserMessage';
import getBoardMessages from '../common/get/message/helper-functions/getBoardMessage';

export default async function initUser(id) {
  const { session } = this;
  // console.time('UserDataFetch');
  let u = null;
  let channelData = null;
  try {
    // u = get(id, session);
    u = findUserDetails(id, true);
    // // gettting all the board and userConnection session for acitve test
    // const boardSessions = [];
    // u.Board.forEach(b => boardSessions.push(session.getChannel(`Board-${b.id}`) || []));

    // // getting all the userConnection channel for current online or active test
    // const userSessions = session.getChannel(`UserConnection-${id}`) || [];

    // // collecting all the related user to current user
    // const finalUserList = userPresentorHelper([...flat(boardSessions), ...flat(userSessions)], u.User);

    // // inform all the user to i am active now
    // activeInformer(id, u.Board, u.UserConnection, session, true)();

    // // adding socket close handler
    // session.addCloseListener(activeInformer(id, u.Board, u.UserConnection, session, false));

    // // subscribe to the main board that show all user active astatus
    // // NOTE:  *need to analysis either or not it is required or not*
    session.subscribe('Main');

    // Initializing all the data to related user
    session.dispatch(schema.init('User', [u.user]));
    session.dispatch(schema.init('UserDetail', [u.userDetail]));
    session.dispatch({ type: 'LOGIN', payload: { ...u.user, userDetails: u.userDetail } });
    session.dispatch(schema.init('UserEducation', u.userEducation));
    session.dispatch(schema.init('UserWorkExperience', u.userWorkExperience));
    session.dispatch(schema.init('UserPortal', u.userPortal));
    session.dispatch(schema.init('UserSkill', u.userSkill));
    session.dispatch(schema.init('UserCarrierInterest', u.userCarrierInterest));

    // subscribing in related channel and send the data that is collected
    channelData = getChannelIds(id);
    // console.log('channel details', channelData);
    const { allBoard, allBlogs, connectionList, allBoardColumns } = channelData;
    // setting data in the cache
    // session.set('userData', u);

    // subscribe to all Related board
    allBoard.forEach(bg => session.subscribe(`Board-${bg.id}`));

    // subscribe to all the connections
    connectionList.forEach(user => session.subscribe(`UserConnection-${user.user.user.id}`));

    // subscribe to all related blog for comment and like broadcast
    allBlogs.forEach(blog => session.subscribe(`Blog-${blog.id}`));

    session.dispatch(schema.init('UserConnection', connectionList));

    session.dispatch(schema.init('Board', allBoard));
    session.dispatch(schema.init('BoardColumn', allBoardColumns));
    // session.dispatch(schema.init('BoardColumnCard', u.BoardColumnCard));
    // session.dispatch(schema.init('BoardColumnCardAttachment', u.BoardColumnCardAttachment));
    // session.dispatch(schema.init('BoardColumnCardComment', u.BoardColumnCardComment));
    // session.dispatch(schema.init('BoardColumnCardDescription', u.BoardColumnCardDescription));
    // session.dispatch(schema.init('BoardColumnCardTag', u.BoardColumnCardTag));
    // session.dispatch(schema.init('BoardMessage', u.BoardMessage));
    // session.dispatch(schema.init('BoardMessageSeenStatus', u.BoardMessageSeenStatus));

    session.dispatch(schema.init('Blog', allBlogs));
    // session.dispatch(schema.init('BlogComment', ));
    // session.dispatch(schema.init('BlogLike', u.BlogLike));
    // session.dispatch(schema.init('BoardMember', u.BoardMember));

    // session.dispatch(schema.init('Notification', u.Notification));
    // session.dispatch(schema.init('NotificationReadStatus', u.NotificationReadStatus));
    // console.timeEnd('UserDataFetch');
    // const chatList = getChatList(allBoard, connectionList, id);
    // session.dispatch(schema.init('ChatHistory', chatList));
    // const { userMessageSeenStatus, userMessages } = getUserMessages(id);
    // session.dispatch(schema.init('UserMessage', userMessages));
    // session.dispatch(schema.init('UserMessageSeenStatus', userMessageSeenStatus));
    // console.log('chat list', chatList);
  } catch (err) {
    console.error('Error in getting data from cache', err);
    throw err;
  }
}
