import ls from 'local-storage'
import {s3sandbox} from '../assets/keys'

const API_ROOT = 'http://localhost:3000/api/v1'

const HEADERS = { 'Content-Type': 'application/json', 'Accepts': 'application/json' }

const AUTHORIZED_HEADERS = () => {
  const jwt = ls.get('jwt_token')
  return {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
    'Authorization': `Bearer ${jwt}`
  }
}


const login_headers = () => {
  return {
    'Content-Type': 'application/json',
    'Accepts': 'application/json'
  }
}




export const loginCurrentUser = (credentials) => {
  const user = {user: credentials}
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: login_headers(),
    body: JSON.stringify({
      user: credentials
      // username: credentials.username,
      // password: credentials.password
    })
  }).then(res => res.json())
}



// passing JWT token to /profile, returns user data
export const fetchCurrentUser = (jwt) => {
  return fetch(`${API_ROOT}/profile`, {
    method: 'GET',
    headers: AUTHORIZED_HEADERS()
  })
  .then(response => response.json())
}

export const fetchAlbums = () => {
  return fetch("http://localhost:3000/api/v1/albums", {
    method: 'GET',
    headers: AUTHORIZED_HEADERS()
  })
  .then(results => results.json())
}

export const fetchSongs = () => {
  return fetch("http://localhost:3000/api/v1/songs", {
    method: 'GET',
    headers: AUTHORIZED_HEADERS()
  })
  .then(results => results.json())
}

export const createSong = (songParams) => {
  return fetch("http://localhost:3000/api/v1/songs", {
    method: 'POST',
    headers: AUTHORIZED_HEADERS(),
    body: JSON.stringify({song: songParams})
  })
  .then(response => response.json())
}

export const getSignedUrl = (s3key) => {
  return fetch(`http://localhost:3000/api/v1/s3/signed_url?bucket=${s3sandbox}&key=${s3key}`, {
    method: 'GET',
    headers: AUTHORIZED_HEADERS()
  })
    .then(response => response.json())
}
