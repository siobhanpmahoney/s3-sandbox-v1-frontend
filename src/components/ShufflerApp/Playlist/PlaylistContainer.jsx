import React from 'react'
import {withRouter} from 'react-router'


class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log(this.props)
    return (
      <div>
        Playlist
      </div>
    )
  }
}

export default withRouter(PlaylistContainer)