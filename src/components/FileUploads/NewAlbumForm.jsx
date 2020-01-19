import React from 'react'

const NewAlbumForm = ({newAlbumFormListener, albumImage, albumTitle}) => {
  return (
    <div className="file__upload__new-album-form-container">
      <div classname="file__upload__new-album-form-wrapper">
        <form>
          <label>Album: </label>
          <input onChange={newAlbumFormListener} className="file__upload__new-album-form-input" name="title" value={albumTitle} />
          <label>Image: </label>
          <input onChange={newAlbumFormListener} className="file__upload__new-album-form-input" name="image" value={albumImage} />
        </form>
      </div>
    </div>
  )
}

export default NewAlbumForm
