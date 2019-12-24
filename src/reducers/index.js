import {combineReducers} from 'redux'
import {user} from './user'
import {albums} from './albums'
import {songs} from './songs'


const rootReducer = combineReducers({
  user,
  albums,
  songs
  // other reducers
});

export default rootReducer;
