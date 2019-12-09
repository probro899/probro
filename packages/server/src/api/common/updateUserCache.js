/* eslint-disable import/no-cycle */
import schema from '@probro/common/source/src/schema';
import { user } from '../../cache';

export default function updateUserCache(obj, session, todo) {
  Object.keys(obj).forEach((key) => {
    session.dispatch(schema[todo](key, obj[key]));
    user.update(schema[todo](key, obj[key]), session);
  });
}
