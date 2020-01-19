import React from 'react'

const NewAlbumForm = ({newAlbumFormListener, albumImage, albumTitle, onCreateAlbum}) => {
  return (
    <div className="file__upload__new-album-form-container">
      <div classname="file__upload__new-album-form-wrapper">
        <form>
          <label>Album: </label>
          <input onChange={newAlbumFormListener} className="file__upload__new-album-form-input" name="title" value={albumTitle} />
          <label>Image: </label>
          <input onChange={newAlbumFormListener} className="file__upload__new-album-form-input" name="image" value={albumImage} />


        </form>
        <div>
          <button onClick={onCreateAlbum}>Create Album</button>
        </div>
      </div>
    </div>
  )
}

export default NewAlbumForm
