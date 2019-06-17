/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import { user } from '../cache';

export default async function initUser(id) {
  const { session } = this;

  let u = null;
  try {
    u = await user.get(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
  session.set('user', u);
  session.subscribe('Board');

  session.dispatch(schema.init('User', u.user));
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
}
