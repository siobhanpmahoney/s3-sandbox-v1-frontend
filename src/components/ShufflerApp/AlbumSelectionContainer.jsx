import React from 'react'
import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {removeCurrentUserAction, fetchAlbumDataAction, fetchSongDataAction, createVersionAction} from '../../actions'
import AlbumSelectionItem from './AlbumSelectionItem'

const AlbumSelectionContainer = (props) => {


    return (
      <div>
        {props.albums.map((album) => {
          return <AlbumSelectionItem key={album.id} album={album} />
        })}
      </div>
    )


}

function mapStateToProps(state, props) {
    return {
      albums: state.albums,
    }
  }

export default withRouter(connect(mapStateToProps, {})(AlbumSelectionContainer))
