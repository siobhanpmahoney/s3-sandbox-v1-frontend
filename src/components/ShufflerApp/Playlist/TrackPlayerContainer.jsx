import React from 'react'
import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../../utils/Loader'
import TrackPlayer from './TrackPlayer'
import PlaylistTrackList from './PlaylistTrackList'

// container component: houses tracklist AND audio player
//
class TrackPlayerContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTrack: null
    }

  }

  componentDidMount() {
    if (!!this.props.album) {
      this.setState({
        currentTrack: this.retrievedTracks()[0]
      })
    }

  }

// parses song:track from routeparams => dictionary pairing ids
  trackParser = () => {
    let trackObj = {}
    this.props.location.search.split("?tracks=")[1].split("&").forEach((songVersionPair) => {
      return trackObj[songVersionPair.split("=")[0]] = songVersionPair.split("=")[1]
    })
    return trackObj // {...songId:versionId}
  }


// loops through album's songs and trackerParser() => {...songData, version: {...versionData}}
  retrievedTracks = () => {
    let songTrackPairs = this.trackParser()
    return this.props.album.songs.map((song) => {

      return {title: song.title, id: song.id, version: song.versions.find((v) => v.id == songTrackPairs[song.id])}
    })
  }  // returns {id: songId, title: songTitle, version: {...trackData}}



  onSelectSong = (event) => {
    let trackSelection = this.retrievedTracks().find((track) => track.id == event.target.id)

    this.setState({
      currentTrack: trackSelection
    }, () => console.log(this.state))
  }


  renderTrackPlayer = () => {
    return !this.state.currentTrack ? (
       <Loader />
    ) : (
      <TrackPlayer currentTrack={this.state.currentTrack} onSelectSong={this.onSelectSong} />
    )
  }


  render() {
    if (!!this.props.album) {
      console.log("retrievedTracks", this.retrievedTracks()[0])
    }

    return !this.props.album ? (
        <Loader />
    ) : (
        <div>

          {this.renderTrackPlayer()}


          <PlaylistTrackList trackList={this.retrievedTracks()} onSelectSong={this.onSelectSong}/>
        </div>
    )




  }
}

function mapStateToProps(state, props) {
    return {
      album: state.albums && state.albums.find((a) => a.id == props.albumId)
    }
  }

export default withRouter(connect(mapStateToProps, {})(TrackPlayerContainer))
