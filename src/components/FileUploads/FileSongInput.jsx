import React from 'react'
import Select from 'react-select'

const FileSongInput = ({loadSongOptions, parseSongOptions, onSelectSong, songInput}) => {
  const defaultSong = () => {
    let song = songInput()
    return {value: song.id, label: song.title}
  }
  return (
    <Select
      onChange={onSelectSong}
      name="song"
      defaultValue={defaultSong}
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
  )
}

export default FileSongInput
