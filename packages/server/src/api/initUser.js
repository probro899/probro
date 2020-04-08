/* eslint-disable import/no-cycle */
import lodash from 'lodash';
import schema from '@probro/common/src/schema';
import get from '../cache/database/get';

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

function userPresentorHelper(boards, userList) {
  // console.log('Boards and userlist', boards, userList);
  const finalUserList = userList.map((u) => {
    for (let i = 0; i < boards.length; i += 1) {
      if (boards[i].values.user.id === u.id) {
        return { ...u, activeStatus: true };
      }
    }
    return { ...u, activeStatus: false };
  });
  return finalUserList;
}

export default async function initUser(id) {
  // console.log('init user called', id);
  const { session } = this;

  let u = null;
  try {
    u = get(id, session);
    // console.log('get Res', u);
  } catch (err) {
    console.error('error in getUser data from cache', err);
    throw err;
  }

  // setting data in the cache
  session.set('userData', u);
  // subscribe to all Related board
  u.Board.forEach(b => session.subscribe(`Board-${b.id}`));
  lodash.uniq(flat(u.UserConnection.map(obj => [obj.mId, obj.userId]))).forEach(uid => session.subscribe(`UserConnection-${uid}`));

  u.allAssociateBlogsId.forEach(blogId => session.subscribe(`Blog-${blogId}`));

  const boardSessions = [];
  u.Board.forEach(b => boardSessions.push(session.getChannel(`Board-${b.id}`) || []));
  // console.log('Sessiosn user Details', boardSessions.flat()[0].values.user);
  const userSessions = session.getChannel(`UserConnection-${id}`) || [];
  // console.log('UserSessions', userSessions);
  const finalUserList = userPresentorHelper([...flat(boardSessions), ...flat(userSessions)], u.User);
  // console.log('finalUSerlist', finalUserList);
  // boardSessions.forEach(s => console.log(JSON.stringify(s.id)));

  u.Board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b })).forEach(obj => obj.channel.dispatch(schema.update('User', { id, activeStatus: true })));
  lodash.uniq(flat(u.UserConnection.map(obj => [obj.mId, obj.userId]))).map(uid => ({ channel: session.channel(`UserConnection-${uid}`) })).forEach(obj => obj.channel.dispatch(schema.update('User', { id, activeStatus: true })));
  // console.log('userDetaisl in initUser', u.User);
  // console.log('userConnection', u.BoardMessageSeenStatus);
  // const boardWithLiveStatus = u.Board.map(b => (session.getChannel(`Board-live-${b.id}`) ? session.getChannel(`Board-live-${b.id}`).length : 0));
  // console.log('boardWIth live status', boardWithLiveStatus);
  // const finalBoard = u.Board.map((b, idx) => ({ ...b, activeStatus: boardWithLiveStatus[idx] > 1 }));
  session.subscribe('Main');

  // console.log('board member', u.BoardMember);
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
