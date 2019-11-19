import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';


const FileAlbumInput = ({loadAlbumOptions, parseAlbumOptions, onSelectAlbum, onCreateAlbum, albumInput}) => {
  // <Select
  //   onChange={onSelectAlbum}
  //   name="album"
  //   isFixed
  //   defaultValue={albumInput()}
  //   options={parseAlbumOptions()}
  //   isFocused
  //   isClearable
  //   isSearchable
  //   blurInputOnSelect={false}
  //   captureMenuScroll={true}
  //   closeMenuOnScroll={false}
  //   closeMenuOnSelect={true}
  //   autoFocus
  //   controlShouldRenderValue
  //
  //   />
  return (
    <div>
      <CreatableSelect
        onChange={onSelectAlbum}
        name="album"
        defaultValue={albumInput()}
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
