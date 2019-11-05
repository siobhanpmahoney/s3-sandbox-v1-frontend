const API_ROOT = 'http://localhost:3000/api/v1'

const HEADERS = { 'Content-Type': 'application/json', 'Accepts': 'application/json' }

export const fetchAlbums = () => {
  return fetch("http://localhost:3000/api/v1/albums")
  .then(results => results.json())
}

export const fetchSongs = () => {
  return fetch("http://localhost:3000/api/v1/songs")
  .then(results => results.json())
}

export const createSong = (songParams) => {
  return fetch("http://localhost:3000/api/v1/songs", {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({song: songParams})
  })
  .then(response => response.json())
}
