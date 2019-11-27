import React from 'react'
import SongListContainer from './Song/SongListContainer'

const AlbumListItem = ({album, songList}) => {
  return (
    <div>
      <h3>{album.title}</h3>

    <SongListContainer songs={songList} />
    
    </div>
  )
}

export default AlbumListItem
