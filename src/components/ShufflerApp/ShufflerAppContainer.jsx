import React from 'react'
import {withRouter} from 'react-router'
import AlbumSelectionContainer from './AlbumSelectionContainer'

class ShufflerAppContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  goToPage = () => {
    return this.props.history.push("/music")
  }

  render() {
    return (
      <div>
        Select Artist
        <div>
        <button onClick={this.goToPage}>bcc</button>

        </div>

      </div>
    )
  }
}

export default withRouter(ShufflerAppContainer)
