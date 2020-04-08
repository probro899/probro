/* eslint-disable import/no-cycle */
import LRU from 'lru-cache';
import database from './database';
import liveBoard from './live-board';

const users = new LRU({
  max: 100000,
});

export { database, liveBoard };

export default {
  users,
};
