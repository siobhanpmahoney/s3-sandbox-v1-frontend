import React from 'react'

const VersionItemMetadata = ({version}) => {
  return (
    <div>

      <br />

    <div>Version Details</div>

    <div>Date: {version.date}</div>
    <div>Description: {version.description}</div>
    <div>Date create: {version.created_at}</div>




    </div>
  )
}

export default VersionItemMetadata
