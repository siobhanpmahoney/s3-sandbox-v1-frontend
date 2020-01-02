import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Loader from '../../utils/Loader'



const TrackPlayer = ({currentTrack}) => {

  return (

    <AudioPlayer
      src={currentTrack.version.s3_key}
      onPlay={e => console.log("onPlay")}
      showJumpControls
      showLoopControl
      showSkipControls
      showVolumeControl
    />
  )
}

export default TrackPlayer
