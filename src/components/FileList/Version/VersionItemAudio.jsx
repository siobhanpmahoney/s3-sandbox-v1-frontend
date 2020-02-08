import React from 'react'
import Loader from '../../utils/Loader'

const VersionitemAudio = ({version, signedUrl}) => {
  return (!signedUrl ? (
      <Loader />

    ) : (
      <div>
        <div>Uploaded: {version.created_at}</div>
        <audio controls>
          <source src={signedUrl} type="audio/x-m4a" / >
        </audio>
      </div>
    )
  )
}

export default VersionitemAudio
