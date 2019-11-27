import React from 'react'
import VersionItemMetadata from './VersionItemMetadata'

class VersionItemContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <VersionItemMetadata version={this.props.version} />
      </div>
    )
  }
}


export default VersionItemContainer
