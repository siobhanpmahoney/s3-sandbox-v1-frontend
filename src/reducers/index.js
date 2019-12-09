import {combineReducers} from 'redux'
import {user} from './user'
import {albums} from './albums'

const rootReducer = combineReducers({
  user,
  albums
  // other reducers
});

export default rootReducer;
