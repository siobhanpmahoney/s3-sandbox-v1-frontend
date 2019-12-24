import { SET_SONG_DATA, CREATE_VERSION} from '../actions'

const DEFAULT_STATE = [];
export const songs = (state = [], action) => {
  switch(action.type) {

    case SET_SONG_DATA:
      // let user_state = Object.assign({}, state)
      // user_state = action.payload.user
      // return Object.assign({}, state, action.payload)
      return [...state,...action.payload]

    case CREATE_VERSION:
      let idx = state.find((song) => song.id == action.payload.id)
      return !!idx ? (
         [...state.slice(0, idx), action.payload,...state.slice(idx+1)]
      ) : (
        [...state, action.payload]
      )

    default:
      return state;
  }
}
