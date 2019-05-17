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

  session.dispatch(schema.init('User', u.user));
  session.dispatch(schema.init('UserDetail', u.userDetail));
  session.dispatch(schema.init('Board', u.board));
  session.dispatch(schema.init('BoardColumn', u.boardColumn));
  session.dispatch(schema.init('BoardColumnCard', u.boardColumnCard));
  session.dispatch(schema.init('BoardColumnCardAttachment', u.boardColumnCardAttachment));
  session.dispatch(schema.init('BoardColumnCardComment', u.boardColumnCardDescription));
}