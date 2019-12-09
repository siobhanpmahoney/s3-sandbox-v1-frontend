
import {loginCurrentUser, fetchCurrentUser, fetchAlbums} from '../service'
import ls from 'local-storage'



export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

export const SET_ALBUM_DATA = 'SET_ALBUM_DATA'



export function fetchCurrentUserAction(jwt) {
  return(dispatch) => {
    return fetchCurrentUser(jwt)
    .then(json => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: json
      })
      return json.user.id;
    })
  }
}

export function removeCurrentUserAction() {
  return {
    type: REMOVE_CURRENT_USER,
  };
}

export function fetchAlbumDataAction() {
  return(dispatch) => {
    return fetchAlbums()
    .then(response => {
      dispatch({
        type: SET_ALBUM_DATA,
        payload: response
      })
    })
  }

}
