/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { reducer as schemaReducer } from './schema';
import { reducer as accountReducer } from './account';
import navReducer from './navReducer';
import webRtcReducer from './webRtcReducer';

const reducer = combineReducers({
  account: accountReducer(),
  webRtc: webRtcReducer,
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
    'BoardColumnCardTag',
    'Blog',
    'BlogDetail',
    'BlogComment',
    'BlogLike',
    'Notification',
    'BoardMember',
    'UserEducation',
    'UserWorkExperience',
    'UserSkill',
    'UserPortal',
    'BoardMessage',
    'UserConnection',
    'UserMessage',
    'UserCarrierInterest',
    'BoardMessageSeenStatus',
    'UserMessageSeenStatus',
    'NotificationReadStatus'
  ),
});

export default reducer;
