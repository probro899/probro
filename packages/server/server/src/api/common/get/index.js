import getBoardAPI from './schema/board';
import messageAPI from './message';

export default [
  ...getBoardAPI,
  ...messageAPI,
];
