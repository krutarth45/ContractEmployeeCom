import { combineReducers } from 'redux';
import { filtersReducer } from './filtersReducer';
import { jobsReducer } from './jobsReducer';
import { modeReducer } from './modeReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  mode: modeReducer,
  jobs: jobsReducer,
  filters: filtersReducer
});

export default rootReducer;
