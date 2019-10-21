import schema from '@probro/common/source/src/schema';
import { user } from '../../cache';

export default function updateUserCache(obj, session) {
  Object.keys(obj).forEach((key) => {
    session.dispatch(schema.add(key, obj[key]));
    user.update(schema.add(key, obj[key]), session);
  });
}
