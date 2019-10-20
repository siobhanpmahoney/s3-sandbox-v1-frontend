import React from 'react'

const FileUploadForm = ({sendToS3, onAddFileData, fileInput}) => {
  return (
    <div>
      <h3>Upload Files</h3>

      <form onSubmit={sendToS3}>
        <input onChange={onAddFileData} type="file" name="file" ref={fileInput} multiple />
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}

export default FileUploadForm
