import lodash from 'lodash';
import schema from '@probro/common/src/schema';
import flat from '../flat';

export default (id, Board, UserConnection, session, status) => {
  // inform all the board to i am online now
  return function activeInformer() {
    Board.map(b => ({ channel: session.channel(`Board-${b.id}`), board: b }))
      .forEach(obj => obj.channel.dispatch(schema.update('User', { id, activeStatus: status })));

    // inform all freind to i am online now
    lodash.uniq(flat(UserConnection.map(obj => [obj.mId, obj.userId])))
      .map(uid => ({ channel: session.channel(`UserConnection-${uid}`) }))
      .forEach(obj => obj.channel.dispatch(schema.update('User', { id, activeStatus: status })));
  };
};

