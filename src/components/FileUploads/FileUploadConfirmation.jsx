import React from 'react'
import VersionItemContainer from '../FileList/Version/VersionItemContainer'

const FileUploadConfirmation = ({version, clearUploadConfirmation, album}) => {
  return (
    <div className="file-upload-confirmation-container">
      <div className="file-upload-confirmation-section header">

        File has been added!

      </div>

      <div className="file-upload-confirmation-section details">
        <div className="file-upload-confirmation-section details-album">

          <div className="album-list-item-heading">
            {album.title}
          </div>
        </div>

        <div className="file-upload-confirmation-section details-song">
          <div className="song-list-item-heading">
            {version.song.title}
          </div>

        </div>

        <VersionItemContainer version={version} id={version.id} />

      </div>

      <div className="file-upload-confirmation-section options">
        <button className="file-upload-confirmation-close" onClick={clearUploadConfirmation}>ok</button>
      </div>
    </div>
  )
}

export default FileUploadConfirmation
