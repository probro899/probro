import { combineReducers } from 'redux';
import formReducer from './formReducer';
import mainReducer from './mainReducer';
import classReducer from './classReducer';
import { reducer as schemaReducer } from '../redux/schema';
import { reducer as accountReducer } from '../redux/account';

export default combineReducers({
  account: accountReducer(),
  database: schemaReducer(
    'User',
    'UserDetail',
    'Board',
    'BoardColumn',
    'BoardColumnCard',
    'BoardColumnCardAttachment',
    'BoardColumnCardComment',
    'BoardColumnCardDescription',
    'Blog',
    'BlogDetail',
    'BlogComment',
    'BlogLike',
    'Notification',
    'BoardMember'
  ),
  form: formReducer,
  main: mainReducer,
  _class: classReducer,
  // put here in the form key: value
});
