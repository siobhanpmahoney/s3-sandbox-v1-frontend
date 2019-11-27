import React from 'react'
import VersionListContainer from '../Version/VersionListContainer'

class SongListItem extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className="song-list-item-container">
        <div className="song-list-item-title header">
          {this.props.song.title}
        </div>

        <div className="song-list-item-version-list-wrapper">
          <VersionListContainer versions={this.props.song.versions} />
        </div>
      </div>
    )
  }
}

export default SongListItem
