import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';


const FileAlbumInput = ({loadAlbumOptions, parseAlbumOptions, onSelectAlbum, onCreateAlbum, albumInput}) => {

  return (
    <div>
      <CreatableSelect
        onChange={onSelectAlbum}
        name="album"
        value={albumInput()}
        createOptionPosition="first"
        isFixed
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
    </div>
  )
}

export default FileAlbumInput
