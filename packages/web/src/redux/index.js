import { createStore, combineReducers } from 'redux';
import { reducer as accountReducer } from './account';

const reducer = combineReducers({
  account: accountReducer(),
});

const store = createStore(reducer);

export default store;
