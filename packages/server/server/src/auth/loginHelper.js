import uuid from 'uuid';
import cache from '../cache';

const SESSION_AGE = 7 * 86400 * 1000; // session duration of one week

const loginHelper = async (rec, userDetails) => {
  const token = uuid();
  const user = {
    id: rec.id,
    firstName: rec.firstName,
    lastName: rec.lastName,
    middleName: rec.middleName,
    email: rec.email,
    type: rec.type,
    slug: rec.slug,
    token,
    userDetails: userDetails || {},
  };
  cache.users.set(token, user, SESSION_AGE);
  return { id: rec.id, token, slug: rec.slug, userType: rec.type };
};

export default loginHelper;
