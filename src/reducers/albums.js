import { SET_ALBUM_DATA, CREATE_ALBUM } from '../actions'

const DEFAULT_STATE = [];
export const albums = (state = [], action) => {
  switch(action.type) {

    case SET_ALBUM_DATA:
      // let user_state = Object.assign({}, state)
      // user_state = action.payload.user
      // return Object.assign({}, state, action.payload)
      return [...DEFAULT_STATE,...action.payload]

    case CREATE_ALBUM:
      return [...state, action.payload]

    default:
      return state;
  }
}
