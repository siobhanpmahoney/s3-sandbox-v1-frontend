import React from 'react'
import VersionItemMetadata from './VersionItemMetadata'
import VersionItemAudio from './VersionItemAudio'
import {getSignedUrl} from '../../../service'

class VersionItemContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisplayingAudio: false,
      signedUrl: null
    }
  }

  componentDidMount() {
    this.getSignedUrl()
  }

  getSignedUrl = () => {

    getSignedUrl(this.props.version.s3_key)
    .then(res => console.log(res))
  }

  toggleAudioDisplay = () => {
    this.setState({
      isDisplayingAudio: !this.state.isDisplayingAudio
    })
  }

  render() {
    return (
      <div>
        <div className="version-item-container-header"></div>
        <VersionItemMetadata version={this.props.version} />

        {!!this.state.isDisplayingAudio ? (
          <VersionItemAudio version={this.props.version} />
        ) : (
          <button onClick={this.toggleAudioDisplay}>show audio</button>
        )}

      </div>
    )
  }
}


export default VersionItemContainer
