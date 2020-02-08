import React from 'react'

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

    return (
      <div className="fileList__songItem__container">

        <div className="fileList__songItem__wrapper">
          <div className="fileList__songItem__header">
            {this.props.song.title}
          </div>

            <VersionListContainer versions={this.props.song.versions} />
        </div>




      </div>
    )
  }
}

export default SongListItem
