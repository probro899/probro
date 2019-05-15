import LRU from 'lru-cache';
import user from './user';

const users = new LRU({
  max: 100,
});

export { user };

export default {
  users,
};
