import React from 'react'
import SongListContainer from './Song/SongListContainer'

const AlbumListItem = ({album, songList}) => {
  return (
    <div>
      <div className="album-list-item-heading">{album.title}</div>

    <SongListContainer songs={songList} />

    </div>
  )
}

export default AlbumListItem
