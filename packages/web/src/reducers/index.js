import { combineReducers } from 'redux';
import formReducer from './formReducer';
import mainReducer from './mainReducer';

export default combineReducers({
  form: formReducer,
  main: mainReducer,
  // put here in the form key: value

});
