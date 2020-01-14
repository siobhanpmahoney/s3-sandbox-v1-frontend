import React from 'react'

const PlaylistTrackItem = ({track, onSelectTrack}) => {
  return (
    <div id={track.id} onClick={() => onSelectTrack(track.id)}>
      {track.title}
    </div>
  )
}

export default PlaylistTrackItem
