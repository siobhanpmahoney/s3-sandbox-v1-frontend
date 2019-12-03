import React from 'react'
import Collapse from "@kunukn/react-collapse";

import VersionListContainer from '../Version/VersionListContainer'

class SongListItem extends React.Component {
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

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }



  render() {
    const duration = "300ms"

    return (
      <div className="song-list-item-component">

        <button className="song-list-item-wrapper" onClick={this.onToggleOpen}>
          <div className="song-list-item-heading">
            {this.props.song.title}
          </div>
        </button>

          <Collapse transition={`height ${duration} cubic-bezier(0.4, 0, 0.2, 1)`} isOpen={this.state.isOpen} >
            <VersionListContainer versions={this.props.song.versions} />
          </Collapse>


      </div>
    )
  }
}

export default SongListItem
