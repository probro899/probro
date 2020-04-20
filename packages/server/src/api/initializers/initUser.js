/* eslint-disable import/no-cycle */
import lodash from 'lodash';
import schema from '@probro/common/src/schema';
import get from '../../cache/database/get';
import flat from '../flat';
import userPresentorHelper from './isUserActiveStatus';
import activeInformer from './activeInformer';

export default async function initUser(id) {
  const { session } = this;

  let u = null;
  try {
    u = get(id, session);
  } catch (err) {
    console.error('error in getUser data from cache', err);
    throw err;
  }

  // setting data in the cache
  session.set('userData', u);

  // subscribe to all Related board
  u.Board.forEach(b => session.subscribe(`Board-${b.id}`));

  // subscribe to all the connection board
  lodash.uniq(flat(u.UserConnection.map(obj => [obj.mId, obj.userId]))).forEach(uid => session.subscribe(`UserConnection-${uid}`));

  // subscribe to all related blog for comment and like broadcast
  u.allAssociateBlogsId.forEach(blogId => session.subscribe(`Blog-${blogId}`));

  // gettting all the board and userConnection session for acitve test
  const boardSessions = [];
  u.Board.forEach(b => boardSessions.push(session.getChannel(`Board-${b.id}`) || []));

  // getting all the userConnection channel for current online or active test
  const userSessions = session.getChannel(`UserConnection-${id}`) || [];

  // collecting all the related user to current user
  const finalUserList = userPresentorHelper([...flat(boardSessions), ...flat(userSessions)], u.User);


  // inform all the user to i am active now
  activeInformer(id, u.Board, u.UserConnection, session, true)();

  // adding socket close handler
  session.addCloseListener(activeInformer(id, u.Board, u.UserConnection, session, false));

  // subscribe to the main board that show all user active astatus
  // NOTE:  *need to analysis either or not it is required or not*
  session.subscribe('Main');

  // Initializing all the data to related user
  session.dispatch(schema.init('User', finalUserList));
  session.dispatch(schema.init('UserDetail', u.UserDetail));
  session.dispatch(schema.init('Board', u.Board));
  session.dispatch(schema.init('BoardColumn', u.BoardColumn));
  session.dispatch(schema.init('BoardColumnCard', u.BoardColumnCard));
  session.dispatch(schema.init('BoardColumnCardAttachment', u.BoardColumnCardAttachment));
  session.dispatch(schema.init('BoardColumnCardComment', u.BoardColumnCardComment));
  session.dispatch(schema.init('BoardColumnCardDescription', u.BoardColumnCardDescription));
  session.dispatch(schema.init('BoardColumnCardTag', u.BoardColumnCardTag));
  session.dispatch(schema.init('Blog', u.Blog));
  session.dispatch(schema.init('BlogComment', u.BlogComment));
  session.dispatch(schema.init('BlogLike', u.BlogLike));
  session.dispatch(schema.init('BoardMember', u.BoardMember));
  session.dispatch(schema.init('UserEducation', u.UserEducation));
  session.dispatch(schema.init('UserWorkExperience', u.UserWorkExperience));
  session.dispatch(schema.init('UserPortal', u.UserPortal));
  session.dispatch(schema.init('UserSkill', u.UserSkill));
  session.dispatch(schema.init('UserCarrierInterest', u.UserCarrierInterest));
  session.dispatch(schema.init('BoardMessage', u.BoardMessage));
  session.dispatch(schema.init('BoardMessageSeenStatus', u.BoardMessageSeenStatus));
  session.dispatch(schema.init('UserConnection', u.UserConnection));
  session.dispatch(schema.init('UserMessage', u.UserMessage));
  session.dispatch(schema.init('UserMessageSeenStatus', u.UserMessageSeenStatus));
  session.dispatch(schema.init('Notification', u.Notification));
  session.dispatch(schema.init('NotificationReadStatus', u.NotificationReadStatus));
}
