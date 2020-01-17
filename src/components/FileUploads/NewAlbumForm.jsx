import React from 'react'

const NewAlbumForm = () => {
  return (
    <div className="file__upload__new-album-form-container">
      <div classname="file__upload__new-album-form-wrapper">
        <form>
          <input className="file__upload__new-album-form-input" name="albumTitle" />

          <input className="file__upload__new-album-form-input" name="albumImage" />
        </form>
      </div>
    </div>
  )
}

export default NewAlbumForm
