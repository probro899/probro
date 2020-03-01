/* eslint-disable import/no-cycle */
import LRU from 'lru-cache';
import database from './database';

const users = new LRU({
  max: 100000,
});

export { database };

export default {
  users,
};
