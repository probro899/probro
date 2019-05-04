import { combineReducers } from 'redux';
import formReducer from './formReducer';
import mainReducer from './mainReducer';
import classReducer from './classReducer';

export default combineReducers({
  form: formReducer,
  main: mainReducer,
  _class: classReducer,
  // put here in the form key: value
});
