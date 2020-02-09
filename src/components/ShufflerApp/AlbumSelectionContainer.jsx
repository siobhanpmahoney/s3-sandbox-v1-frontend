import React from 'react'
import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {removeCurrentUserAction, fetchAlbumDataAction, fetchSongDataAction, createVersionAction} from '../../actions'
import AlbumSelectionItem from './AlbumSelectionItem'

const AlbumSelectionContainer = (props) => {

  const generatePlaylist = (album_id) => {
    let album = props.albums.find((album) => album.id == album_id)
    let list = album.songs.map((song) => {
      let version = song.versions[Math.floor(Math.random() * song.versions.length)]
      const {title, album_id} = song
      let s = {song_title: title, album_id: album_id}

      let obj = Object.assign({}, version, s)
      return obj
    })
  }

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
                      return <AlbumSelectionItem key={album.id} album={album} generatePlaylist={generatePlaylist}/>
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
