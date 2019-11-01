export const fetchAlbums = () => {
  return fetch("http://localhost:3000/api/v1/albums")
  .then(results => results.json())
}

export const fetchSongs = () => {
  return fetch("http://localhost:3000/api/v1/songs")
  .then(results => results.json())
}
