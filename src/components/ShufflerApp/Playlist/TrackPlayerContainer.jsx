import React from 'react'
import {withRouter, } from 'react-router'
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
      currentTrack: null,
    }

    this.audio = React.createRef()
  }

  componentDidMount() {
    if (!!this.props.album) {
      this.setState({
        currentTrack: this.retrievedTracks()[0]
      }, this.renderTrackPlayer)
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState != this.state) {
      this.renderTrackPlayer()
    }

    // if (!!prevProps.user.id && !this.props.user.id) {
    //   return this.props.history.push("/")
    // }


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



  // onSelectSong = (id, player) => {
  //   let trackSelection = this.retrievedTracks().find((track) => track.id == id)
  //
  //   this.setState({
  //     currentTrack: trackSelection
  //   })
  // }

  onSelectTrack = (val) => {
    let track = this.retrievedTracks().find(t => {
      return t.id == val;
    });
    console.log("in onSelectTrack", track)
    this.setState({
      currentTrack: track
    }, this.onTrackChange)
  }

  onTrackChange = () => {

    this.audio.current.audio.pause()
    this.audio.current.audio.load();
    this.audio.current.audio.play();
  };

  songEnd = () => {
    const tracks = this.retrievedTracks()
    let trackIdx = tracks.findIndex(t => t.id == this.state.isPlaying.id);
    if (tracks.length == trackIdx + 1) {
    this.setState({
        currentTrack: tracks[0]
      }, this.onTrackChange)
    } else {
      this.setState({
        isPlaying: tracks[trackIdx + 1]
      }, this.onTrackChange);
    }
};

  // onPlaySong = (player) => {
  //   player.current.audio.play()
  // }

  // onClickNext = (id) => {
  //   let idx = this.retrievedTracks().findIndex((track) => track.id == id)
  //   if (idx < (this.props.album.songs.length-1)) {
  //     return this.onSelectSong(idx + 1)
  //   } else {
  //     return this.onSelectSong(0)
  //   }
  // }






  renderTrackPlayer = () => {
    return <TrackPlayer ref={this.audio} currentTrack={this.state.currentTrack} onSelectTrack={this.onSelectTrack} onTrackChange={this.onTrackChange} songEnd={this.songEnd} onClickNext={this.onClickNext} trackList={this.retrievedTracks()}/>

          // !this.props.album || !this.state.currentTrack ? (
          //    <Loader />
          // ) : ()
  }


  render() {

    console.log("TrackPlayerContainer", this.props)
    console.log("location.search props",   this.props.location.search)
    if (!!this.props.album) {
      console.log("retrievedTracks", this.retrievedTracks()[0])
    }

    return !this.props.album ? (
        <Loader />
    ) : (
        <div>

          {this.renderTrackPlayer()}


          <PlaylistTrackList trackList={this.retrievedTracks()} onSelectTrack={this.onSelectTrack}/>
        </div>
    )




  }
}

function mapStateToProps(state, props) {
    return {
      user: state.user,
      album: state.albums && state.albums.find((a) => a.id == props.albumId)
    }
  }

export default withRouter(connect(mapStateToProps, {})(TrackPlayerContainer))
