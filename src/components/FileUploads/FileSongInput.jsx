import React from 'react'
import Select from 'react-select'

const FileSongInput = ({loadSongOptions, parseSongOptions, onSelectSong}) => {
  return (
    <Select
      onChange={onSelectSong}
      name="song"
      isFixed
      options={parseSongOptions()}

      />
  )
}

export default FileSongInput
