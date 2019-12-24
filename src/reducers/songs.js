import { SET_SONG_DATA} from '../actions'

const DEFAULT_STATE = [];
export const songs = (state = [], action) => {
  switch(action.type) {

    case SET_SONG_DATA:
      // let user_state = Object.assign({}, state)
      // user_state = action.payload.user
      debugger
      return Object.assign({}, state, action.payload)


    default:
      return state;
  }
}
