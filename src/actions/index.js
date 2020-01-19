
import {loginCurrentUser, fetchCurrentUser, fetchAlbums, fetchSongs, createSong, createAlbum, createVersion} from '../service'
import ls from 'local-storage'



export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

export const SET_ALBUM_DATA = 'SET_ALBUM_DATA'
export const SET_SONG_DATA = 'SET_SONG_DATA'

export const CREATE_ALBUM = 'CREATE_ALBUM'
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

export function createAlbumAction(albumData) {
  return(dispatch) => {
    return(createAlbum(albumData))
    .then(res => {
      dispatch({
        type: CREATE_ALBUM,
        payload: res
      })
    })
  }
}

export function createVersionAction(song, formdata) {
  return(dispatch) => {

  if (!song.id) {
    return createSong({album_id: song.album_id, title: song.title})
    .then(response => {
      song = Object.assign({}, song, response)
      console.log(song)
      return song
    })
    .then(newSong => {
      formdata.append('song_id', newSong.id)
      return createVersion(formdata)
      .then(res => {
        song["versions"] = [...song["versions"], res]
        dispatch({
          type: CREATE_VERSION,
          payload: song
        })
        return res
      })
    })
  } else {
    formdata.append('song_id', song.id)
    return createVersion(formdata)
    .then(res => {
      song["versions"] = [...song["versions"], res]
      dispatch({
        type: CREATE_VERSION,
        payload: song
      })
      return res
    })
  }

  // formdata.append('song_id', song.id)
    // createVersion(formdata)
    // .then(res => {
    //   song["versions"] = [...song["versions"], res]
    //   dispatch({
    //     type: CREATE_VERSION,
    //     payload: song
    //   })
    //   return res
    // })

  }


}
