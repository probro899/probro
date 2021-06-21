/* eslint-disable import/no-cycle */
import schema from '@probro/common/source/src/schema';

export default function updateUserCache(obj, session, todo) {
  // console.log('session value in updateUserCache', session, obj, todo);
  Object.keys(obj).forEach((key) => {
    session.dispatch(schema[todo](key, obj[key]));
    // database.update(schema[todo](key, obj[key]));
  });
}
