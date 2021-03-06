import React from 'react'
import SongListItem from './SongListItem'

const SongListContainer = ({songs}) => {
  return (
    <div className="fileList__songList">
      {songs.map((song) => {
        return <SongListItem song={song} key={song.id} />
      })}
    </div>
  )
}

export default SongListContainer
