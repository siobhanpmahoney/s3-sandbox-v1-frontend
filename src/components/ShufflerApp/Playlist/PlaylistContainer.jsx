import React from 'react'
import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../../utils/Loader'


class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log("component mounting")
  }

  trackParser = () => {
    let trackObj = {}
    this.props.location.search.split("?tracks=")[1].split("&").forEach((songVersionPair) => {
      return trackObj[songVersionPair.split("=")[0]] = songVersionPair.split("=")[1]
    })
    return trackObj
  }

  // {song: {...songData}, version: {...versionData}}

  retrievedTracks = () => {
    let songTrackPairs = this.trackParser()
    return this.props.album.songs.map((song) => {

      return {title: song.title, id: song.id, version: song.versions.find((v) => v.id == songTrackPairs[song.id])}
    })
  }

  render() {
    if (!!this.props.album) {
      console.log("retrievedTracks", this.retrievedTracks())
    }

    return !this.props.album ? (
        <Loader />
    ) : (
        <div>
          Playlist
        </div>
    )




  }
}

function mapStateToProps(state, props) {
    return {
      album: state.albums && state.albums.find((a) => a.id == props.albumId)
    }
  }

export default withRouter(connect(mapStateToProps, {})(PlaylistContainer))
