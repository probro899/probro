/* eslint-disable import/no-cycle */
import BoardApi from './board';
import BlogApi from './blog';
import UserApi from './user';

export default [
  ...BoardApi,
  ...BlogApi,
  ...UserApi,
];
