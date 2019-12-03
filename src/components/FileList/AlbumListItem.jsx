import React from 'react'
import Collapse from "@kunukn/react-collapse";
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
    const duration = "300ms"
    return (
      <div className="album-list-item-component">
        <button className="album-list-item-wrapper" onClick={this.onToggleOpen}>
          <div className="album-list-item-heading">
            {this.props.album.title}
          </div>
        </button>
          <Collapse transition={`height ${duration} cubic-bezier(0.4, 0, 0.2, 1)`} isOpen={this.state.isOpen} >
            <SongListContainer songs={this.props.songList} />
          </Collapse>


      </div>
    )
  }
}

export default AlbumListItem
