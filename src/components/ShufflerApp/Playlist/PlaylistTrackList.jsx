import React from 'react'
import Loader from '../../utils/Loader'
import PlaylistTrackItem from './PlaylistTrackItem'

const PlaylistTrackList = ({trackList, onSelectTrack}) => {
  console.log(trackList)

  return (!trackList || trackList.length < 1) ? (
      <Loader />
  ) : (
    <div>
      {trackList.map((track) => {
        return <PlaylistTrackItem track={track} key={track.id} onSelectTrack={onSelectTrack} />
      })}
    </div>
  )

}

export default PlaylistTrackList
