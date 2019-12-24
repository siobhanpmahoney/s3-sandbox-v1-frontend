
import {loginCurrentUser, fetchCurrentUser, fetchAlbums, fetchSongs, createSong, createVersion} from '../service'
import ls from 'local-storage'



export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

export const SET_ALBUM_DATA = 'SET_ALBUM_DATA'
export const SET_SONG_DATA = 'SET_SONG_DATA'

export const CREATE_VERSION = 'CREATE_VERSION'




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

export function fetchSongDataAction() {
  return(dispatch) => {
    return fetchSongs()
    .then(response => {
      dispatch({
        type: SET_SONG_DATA,
        payload: response
      })
    })
  }
}

export function createVersionAction(song, formdata) {
  debugger
  return(dispatch) => {

  if (!song.id) {
    createSong({album_id: song.album_id, title: song.title})
    .then(response => {
      song = Object.assign({}, song, response)
      console.log(song)
      return song
    })
  }

  formdata.append('song_id', song.id)

    return createVersion(formdata)
    .then(res => {
      // console.log(res)
      // song["versions"] = [song["versions"],...res]
      // dispatch({
      //   type: CREATE_VERSION,
      //   payload: song
      // })

    })
  }


}
