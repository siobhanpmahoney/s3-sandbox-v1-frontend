import React from 'react'

const PlaylistTrackItem = ({track, onSelectSong}) => {
  return (
    <div id={track.id} onClick={onSelectSong}>
      {track.title}
    </div>
  )
}

export default PlaylistTrackItem
