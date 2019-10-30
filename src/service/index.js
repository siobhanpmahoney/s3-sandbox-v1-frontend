export const fetchAlbums = () => {
  return fetch("http://localhost:3000/api/v1/albums")
  .then(results => results.json())
}
