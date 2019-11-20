import React from 'react'

class VersionRecord extends React.Component {

  constructor(props) {
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <p>Album: {this.props.album.title}</p>
        <p>Song: {this.props.record.song.title}</p>

        <br />

      <p>Version Details</p>

      <p>Date: </p>
      <p>Description: </p>

      <p>Details: </p>



      </div>
    )
  }
}

export default VersionRecord
