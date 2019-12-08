import { SET_CURRENT_USER, REMOVE_CURRENT_USER} from '../actions'

const DEFAULT_STATE = { id: null, username: null};
export const user = (state = DEFAULT_STATE, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      // let user_state = Object.assign({}, state)
      // user_state = action.payload.user
      return Object.assign({}, state, action.payload.user)

    case REMOVE_CURRENT_USER:
      return Object.assign({}, DEFAULT_STATE);

    default:
      return state;
  }
}
