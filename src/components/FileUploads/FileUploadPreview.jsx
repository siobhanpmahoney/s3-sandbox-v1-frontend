import React from 'react'

const FileUploadPreview = ({preview}) => {
  return (
    <div>
      <audio controls>
        <source src={preview} type="audio/x-m4a" controls / >
        </audio>
      </div>
  )
}

export default FileUploadPreview
