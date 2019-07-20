import { combineReducers } from 'redux';
import { reducer as schemaReducer } from './schema';
import { reducer as accountReducer } from './account';
import navReducer from './navReducer';

const reducer = combineReducers({
  account: accountReducer(),
  navigate: navReducer,
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
});

export default reducer;
