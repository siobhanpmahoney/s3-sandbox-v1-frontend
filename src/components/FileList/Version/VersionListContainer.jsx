import React from 'react'
import VersionItemContainer from './VersionItemContainer'

const VersionListContainer = ({versions}) => {
  return (
    <div>
      {versions.map((version) => {
        return <VersionItemContainer version={version} />
      })}
    </div>
  )
}

export default VersionListContainer
