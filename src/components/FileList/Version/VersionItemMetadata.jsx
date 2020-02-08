import React from 'react'

const VersionItemMetadata = ({version}) => {
  return (
    <div className="fileList__versionItem__metadata">


    <div className="fileList__versionItem__metadata__date">{version.date}</div>
    <div className="fileList__versionItem__metadata__description">{version.description}</div>




    </div>
  )
}

export default VersionItemMetadata
