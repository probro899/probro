import cache from '../cache';

export default function validateToken(token) {
  const user = cache.users.get(`${token}`);
  if (!user) {
    return false;
  }
  return user;
}
