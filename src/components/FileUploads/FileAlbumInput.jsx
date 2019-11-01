import React from 'react'
import Select from 'react-select'

const FileAlbumInput = ({loadAlbumOptions, parseAlbumOptions, onSelectAlbum}) => {
  return (
    <Select
      onChange={onSelectAlbum}
      name="album"
      isFixed
      options={parseAlbumOptions()}

      />
  )
}

export default FileAlbumInput
