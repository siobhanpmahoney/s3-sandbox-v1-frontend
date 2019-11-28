import React from 'react'
import VersionItemMetadata from './VersionItemMetadata'
import VersionItemAudio from './VersionItemAudio'
import {getSignedUrl} from '../../../service'

class VersionItemContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisplayingAudio: false,
      signedUrl: null,
      audioReady: false
    }
  }




  toggleAudioDisplay = () => {
    this.setState({
      isDisplayingAudio: !this.state.isDisplayingAudio
    }, this.getSignedUrl)
  }

  getSignedUrl = () => {
    if (!this.state.signedUrl) {
      getSignedUrl(encodeURI(this.props.version.s3_key))
      .then(res => this.setState({
        signedUrl: res.url,
      }, this.toggleAudioReady)
    )
    } else {
      this.setState({
        audioReady: !this.state.audioReady
      })
    }

  }

  toggleAudioReady = () => {
    console.log(this.state.signedUrl)
    this.setState({
      audioReady: !this.state.audioReady
    }, this.renderAudio)
  }

  renderAudio = () => {
    return !!this.state.audioReady ? (
      <React.Fragment>
        <div>
          {this.state.signedUrl}
        </div>


      <VersionItemAudio version={this.props.version} signedUrl={this.state.signedUrl}/>
      </React.Fragment>
    ) : (
      <button onClick={this.toggleAudioDisplay}>show audio</button>
    )
  }

  render() {
    return (
      <div>
        <div className="version-item-container-header"></div>
        <VersionItemMetadata version={this.props.version} />

       {this.renderAudio()}



      </div>
    )
  }
}


export default VersionItemContainer
