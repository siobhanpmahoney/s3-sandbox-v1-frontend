import React from 'react'
import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {removeCurrentUserAction, fetchAlbumDataAction, fetchSongDataAction, createVersionAction} from '../../actions'
import AlbumSelectionItem from './AlbumSelectionItem'

const AlbumSelectionContainer = (props) => {


    return (
      <div className="album-selection-page">
        <div className="album-selection-page-main-content">
          <div className="album-selection-page-container">

            <div className="section-header">
              Discography
            </div>

            <div className="albumGrid">
              <div className="albumTeaser__row">
                <div className="albumTeaser__group">
                  <div className="albumTeaser__groupInner">
                    {props.albums.map((album) => {
                      return <AlbumSelectionItem key={album.id} album={album} />
                    })}
                  </div>
                </div>
              </div>
            </div>








          </div>





        </div>
      </div>
    )


}

function mapStateToProps(state, props) {
    return {
      albums: state.albums,
    }
  }

export default withRouter(connect(mapStateToProps, {})(AlbumSelectionContainer))
