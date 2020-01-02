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
    return this.props.location.search.split("?tracks=")[1].split("&").map((couple) => {
      return {song: couple.split("=")[0], version: couple.split("=")[1]}
    })
  }

  render() {
    console.log("in render — this.props: ", !!this.props.album)

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
