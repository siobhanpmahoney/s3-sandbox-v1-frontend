import React from 'react'
import Select from 'react-select'

const FileAlbumInput = ({loadAlbumOptions, parseAlbumOptions, onSelectAlbum, albumInput}) => {
  return (
    <Select
      onChange={onSelectAlbum}
      name="album"
      isFixed
      defaultValue={albumInput()}
      options={parseAlbumOptions()}
      isFocused
      isClearable
      isSearchable
      blurInputOnSelect={false}
      captureMenuScroll={true}
      closeMenuOnScroll={false}
      closeMenuOnSelect={true}
      autoFocus
      controlShouldRenderValue

      />
  )
}

export default FileAlbumInput
