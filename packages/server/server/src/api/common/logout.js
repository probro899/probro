/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import * as actions from '@probro/common/src/actions';
import cache from '../../cache';

export default function logout() {
  const { session } = this;
  const user = session.get('user');
  cache.users.del(user.token);
  session.emit('logout');
  session.dispatch({ type: 'LOGOUT' });

  // close the session on logout
  session.close();
}
