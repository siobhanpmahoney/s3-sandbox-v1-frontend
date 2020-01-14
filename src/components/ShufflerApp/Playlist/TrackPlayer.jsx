import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Loader from '../../utils/Loader'


const TrackPlayer = React.forwardRef((props, audio) => {

  // const toggleNext = () => {
  //   player.current.clearListenTrack()
  //   onClickNext(props.currentTrack.id)
  // }


  return (
    <div>



      <br />

        <AudioPlayer
          src={!!props.currentTrack ? `https://sandbox-v3.s3.amazonaws.com/${props.currentTrack.version.s3_key}` : null}
          showJumpControls
          showLoopControl
          showSkipControls
          showVolumeControl
          autoPlay
          title={!!props.currentTrack ? props.currentTrack.title : null}
          onEnded={props.songEnd}
          ref={audio}
        />
      <br />
    </div>
  )
})


export default TrackPlayer
