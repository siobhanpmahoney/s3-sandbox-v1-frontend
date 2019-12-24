import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const FileSongInput = ({loadSongOptions, parseSongOptions, onSelectSong, onCreateSong, songInput}) => {
  return (
    <div className="file-song-input-container">
      <CreatableSelect
        onChange={onSelectSong}
        className="react-select-container"
        classNamePrefix="react-select"
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
