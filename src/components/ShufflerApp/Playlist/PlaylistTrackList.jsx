import React from 'react'
import Loader from '../../utils/Loader'
import PlaylistTrackItem from './PlaylistTrackItem'

const PlaylistTrackList = ({trackList, onSelectSong}) => {
  console.log(trackList)

  return (!trackList || trackList.length < 1) ? (
      <Loader />
  ) : (
    <div>
      {trackList.map((track) => {
        return <PlaylistTrackItem track={track} key={track.id} onSelectSong={onSelectSong} />
      })}
    </div>
  )

}

export default PlaylistTrackList
