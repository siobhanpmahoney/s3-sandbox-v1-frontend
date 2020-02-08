import React from 'react'
import SongListContainer from './Song/SongListContainer'

// const AlbumListItem = ({album, songList}) => {
//   return (
//     <div>
//       <div className="album-list-item-heading">{album.title}</div>
//
//     <SongListContainer songs={songList} />
//
//     </div>
//   )
// }

class AlbumListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className="fileList__albumItem">
        <div className="fileList__albumItem__wrapper">
          <div className="fileList__album__section">

            <div className="fieList__album__header">
              {this.props.album.title}
            </div>

            <SongListContainer songs={this.props.songList} />

          </div>
        </div>
      </div>
    )
  }
}

export default AlbumListItem
