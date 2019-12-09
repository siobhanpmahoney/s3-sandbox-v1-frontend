import { SET_ALBUM_DATA} from '../actions'

const DEFAULT_STATE = { id: null, username: null};
export const albums = (state = {}, action) => {
  switch(action.type) {

    case SET_ALBUM_DATA:
      // let user_state = Object.assign({}, state)
      // user_state = action.payload.user
      return Object.assign({}, state, action.payload)


    default:
      return state;
  }
}
