import React from 'react'
import VersionItemContainer from '../FileList/Version/VersionItemContainer'

const FileUploadConfirmation = ({version, clearUploadConfirmation, album}) => {
  return (
    <div className="file__upload__confirmation-container">
      <div className="file__upload__confirmation-section header">

        File has been added!

      </div>

      <div className="file__upload__confirmation-section details">
        <div className="file__upload__confirmation-section details-album">

          <div className="album-list-item-heading">
            {album.title}
          </div>
        </div>

        <div className="file__upload__confirmation-section details-song">
          <div className="song-list-item-heading">
            {version.song.title}
          </div>

        </div>

        <VersionItemContainer version={version} id={version.id} />

      </div>

      <div className="file__upload__confirmation-section options">
        <button className="file__upload__confirmation-close" onClick={clearUploadConfirmation}>ok</button>
      </div>
    </div>
  )
}

export default FileUploadConfirmation
