import React from 'react'

const FileUploadConfirmation = ({file, clearUploadConfirmation}) => {
  return (
    <div className="file-upload-confirmation-container">
      <div className="file-upload-confirmation-section header">

        File has been added!

      </div>

      <div className="file-upload-confirmation-section details">
        <div className="file-upload-confirmation-section details-album">
          <span className="metadata-label">
            Album:
          </span>

          <span className="metadata-value">

          </span>
        </div>

        <div className="file-upload-confirmation-section details-song">
          <span className="metadata-label">
            Song:
          </span>
          <span className="metadata-value">
            {file.song.title}
          </span>
        </div>

      </div>

      <div className="file-upload-confirmation-section options">
        <button className="file-upload-confirmation-close" onClick={clearUploadConfirmation}>ok</button>
      </div>
    </div>
  )
}

export default FileUploadConfirmation
