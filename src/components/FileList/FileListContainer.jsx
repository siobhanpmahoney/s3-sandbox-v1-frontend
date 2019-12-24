import React from 'react'

import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import Loader from '../utils/Loader'

import AlbumListItem from './AlbumListItem'
import SongListData from './SongListData'
import SongListDataWithAudio from './SongListDataWithAudio'

class FileListContainer extends React.Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.state = {
  //     view: null, // choices: Song List // Song List with Audio
  //     songListData: [], // schema:
  //   }
  // }
  //
  // componentDidMount() {
  //   console.log(this.props)
  //   this.setState({
  //     view: null,
  //     files: {},
  //   }, this.fetchSongData)
  // }
  //
  // getSignedUrl = () => {
  //
  // }
  // //
  // fetchSongData = () => {
  //   fetch("http://localhost:3000/api/v1/albums")
  //   .then(results => results.json())
  //   .then(json => {
  //     return this.setState({
  //       songListData: json
  //     })
  //   })
  // }

  render() {
    console.log("props at render", this.props)

    if (!!this.props.albums && this.props.albums.length > 1) {
      return (
        <div>
          {this.props.albums.map((album) => {
            return <AlbumListItem album={album} songList = {album.songs} key={album.id}/>
          })}
        </div>
      )
    } else {
      return <Loader />

    }

  }

}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    albums: state.albums,
    songs: state.songs
  }
}

export default withRouter(connect(mapStateToProps, {})(WithAuth(FileListContainer)))
