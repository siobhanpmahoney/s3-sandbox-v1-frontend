import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const FileSongInput = ({loadSongOptions, parseSongOptions, onSelectSong, onCreateSong, songInput}) => {
  console.log(songInput())
  return (
    <div>
      <CreatableSelect
        onChange={onSelectSong}
        name="song"
        value={songInput()}
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
