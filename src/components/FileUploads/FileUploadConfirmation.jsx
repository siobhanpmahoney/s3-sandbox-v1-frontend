import React from 'react'

const FileUploadConfirmation = ({file}) => {
  return (
    <div className="file-upload-confirmation-container">
      <div className="file-upload-confirmation-line header">

        File has been added!

      </div>

      <div className="file-upload-confirmation-options">
        <button className="file-upload-confirmation-close">ok</button>
      </div>
    </div>
  )
}

export default FileUploadConfirmation
