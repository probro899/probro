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
    console.error(err);
    throw err;
  }

  // 9840749589
  session.set('userData', u);

  u.board.forEach(b => session.subscribe(`Board-${b.id}`));

  const boardSessions = [];
  u.board.forEach(b => boardSessions.push(session.getChannel(`Board-${b.id}`)));
  // console.log('Sessiosn user Details', boardSessions.flat()[0].values.user);
  const finalUserList = u.board.length === 0 ? [{ ...u.user[0], activeStatus: true }] : userPresentorHelper(boardSessions.flat(), u.user);
  console.log('finalUSerlist', finalUserList);

  // boardSessions.forEach(s => console.log(JSON.stringify(s.id)));

  u.board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b })).forEach(obj => obj.channel.dispatch(schema.update('User', { id, activeStatus: true })));

  session.subscribe('Board');
  console.log('board member', u.boardMember);
  session.dispatch(schema.init('User', finalUserList));
  session.dispatch(schema.init('UserDetail', u.userDetail));
  session.dispatch(schema.init('Board', u.board));
  session.dispatch(schema.init('BoardColumn', u.boardColumn));
  session.dispatch(schema.init('BoardColumnCard', u.boardColumnCard));
  session.dispatch(schema.init('BoardColumnCardAttachment', u.boardColumnCardAttachment));
  session.dispatch(schema.init('BoardColumnCardComment', u.boardColumnCardComment));
  session.dispatch(schema.init('BoardColumnCardDescription', u.boardColumnCardDescription));
  session.dispatch(schema.init('Blog', u.blog));
  session.dispatch(schema.init('BlogDetail', u.blogDetail));
  session.dispatch(schema.init('BlogComment', u.blogComment));
  session.dispatch(schema.init('BlogLike', u.blogLike));
  session.dispatch(schema.init('BoardMember', u.boardMember));
}
