/* eslint-disable import/no-cycle */
import schema from '@probro/common/src/schema';
import * as actions from '@probro/common/src/actions';
import cache from '../../cache';

export default function logout() {
  const { session } = this;
  const user = session.get('user');
  cache.users.del(user.token);
  session.values.userData.Board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b })).forEach(obj => obj.channel.dispatch(schema.update('User', { id: session.values.user.id, activeStatus: false })));
  session.emit('logout');
  session.dispatch({ type: 'LOGOUT' });

  // close the session on logout
  session.close();
}
