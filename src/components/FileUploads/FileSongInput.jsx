import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const FileSongInput = ({loadSongOptions, parseSongOptions, onSelectSong, onCreateSong, songInput}) => {


  // return (
  //   <CreatableSelect
  //     options={parseSongOptions()}
  //     onChange={onSelectSong}
  //     value={defaultSong}
  //     value
  //     creatable
  //     variant
  //     isBorderless
  //     clearable
  //     virtualized
  //     hasArrow
  //     name="song"
  //
  //     />
  // )
  console.log(parseSongOptions())


  return (
    <div>
      <CreatableSelect
        onChange={onSelectSong}
        name="song"
        defaultValue={songInput()}
        createOptionPosition="first"
        isFixed
        options={parseSongOptions()}
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

export default FileSongInput
