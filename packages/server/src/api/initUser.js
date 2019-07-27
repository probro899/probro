/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import { user } from '../cache';

function userPresentorHelper(boards, userList) {
  // console.log(boards[0].values.user.user, userList);
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
  const { session } = this;

  let u = null;
  try {
    u = await user.get(id);
  } catch (err) {
    console.error('error in getUser data from cache', err);
    throw err;
  }

  // 9840749589
  // setting data in the cache
  session.set('userData', u);
  u.Board.forEach(b => session.subscribe(`Board-${b.id}`));

  const boardSessions = [];
  u.Board.forEach(b => boardSessions.push(session.getChannel(`Board-${b.id}`)));
  // console.log('Sessiosn user Details', boardSessions.flat()[0].values.user);
  const finalUserList = u.Board.length === 0 ? [{ ...u.User[0], activeStatus: true }] : userPresentorHelper(boardSessions.flat(), u.User);
  // console.log('finalUSerlist', finalUserList);

  // boardSessions.forEach(s => console.log(JSON.stringify(s.id)));

  u.Board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b })).forEach(obj => obj.channel.dispatch(schema.update('User', { id, activeStatus: true })));

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
  session.dispatch(schema.init('Blog', u.Blog));
  // session.dispatch(schema.init('BlogDetail', u.BlogDetail));
  session.dispatch(schema.init('BlogComment', u.BlogComment));
  session.dispatch(schema.init('BlogLike', u.BlogLike));
  session.dispatch(schema.init('BoardMember', u.BoardMember));
}
