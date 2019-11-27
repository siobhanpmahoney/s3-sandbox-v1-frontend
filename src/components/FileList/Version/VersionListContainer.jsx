import React from 'react'
import VersionItemContainer from './VersionItemContainer'

const VersionListContainer = ({versions}) => {
  return (
    <div>
      {versions.map((version) => {
        return <VersionItemContainer version={version} key={version.id} />
      })}
    </div>
  )
}

export default VersionListContainer
