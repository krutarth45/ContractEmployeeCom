import { combineReducers } from 'redux';
import { modeReducer } from './modeReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  mode: modeReducer
});

export default rootReducer;
