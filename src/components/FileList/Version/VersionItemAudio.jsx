import React from 'react'

const VersionitemAudio = ({version}) => {
  console.log(`https://sandbox-v3.s3.amazonaws.com/${version.s3_key}`)
  return (
    <div>
      <audio controls>
        <source src={`https://sandbox-v3.s3.amazonaws.com/${version.s3_key}`} type="audio/x-m4a" / >
      </audio>
    </div>
  )
}

export default VersionitemAudio
