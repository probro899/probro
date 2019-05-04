import LRU from 'lru-cache';

const users = new LRU({
  max: 100,
});

export default {
  users,
};
