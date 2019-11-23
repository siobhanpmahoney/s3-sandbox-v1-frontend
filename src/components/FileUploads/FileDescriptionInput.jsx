import React from 'react'

const FileDescriptionInput = ({onAddFileDescription, descriptionInput}) => {
  return (
    <div>
      <textarea value={descriptionInput} onChange={onAddFileDescription} />
    </div>
  )
}

export default FileDescriptionInput
